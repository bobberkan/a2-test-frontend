import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentQuiz = () => {
	const [tests, setTests] = useState([])
	const [answers, setAnswers] = useState({})
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	const token = sessionStorage.getItem('token')

	const fetchTests = async () => {
		try {
			const res = await axios.get(
				'https://a2-test-backend.onrender.com/api/tests',
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			setTests(res.data)
		} catch (err) {
			console.error('Failed to fetch tests', err)
			if (err.response?.status === 403) {
				alert('Access Denied. Please login again.')
				sessionStorage.removeItem('token')
				sessionStorage.removeItem('user')
				navigate('/login')
			} else {
				alert('Failed to load tests.')
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!token) {
			navigate('/login')
		} else {
			fetchTests()
		}
	}, [])

	const handleOptionSelect = (questionId, option) => {
		setAnswers(prev => ({ ...prev, [questionId]: option }))
	}

	const handleSubmit = async () => {
		let correctCount = 0

		tests.forEach(test => {
			if (answers[test._id] === test.correctAnswer) {
				correctCount++
			}
		})

		const score = Math.round((correctCount * 100) / tests.length)

		try {
			await axios.post(
				'https://a2-test-backend.onrender.com/api/results/submit',
				{ testType: 'listening', score },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			alert(`Test submitted successfully! Your score: ${score}%`)
			navigate('/student-dashboard')
		} catch (err) {
			console.error('Submission Error:', err)
			alert(err.response?.data?.message || 'Failed to submit result.')
		}
	}

	if (loading) {
		return <div>Loading tests...</div>
	}

	if (tests.length === 0) {
		return <div>No tests available at the moment.</div>
	}

	return (
		<div className='bg-white shadow p-6 rounded-lg'>
			<h2 className='text-xl font-bold mb-4'>Take Quiz</h2>
			{tests.map(test => (
				<div key={test._id} className='mb-4'>
					<p className='font-semibold'>{test.question}</p>
					<div className='mt-2 space-y-1'>
						{test.options.map((opt, idx) => {
							const optionLabel = String.fromCharCode(65 + idx)
							return (
								<label key={idx} className='block'>
									<input
										type='radio'
										name={test._id}
										value={optionLabel}
										checked={answers[test._id] === optionLabel}
										onChange={() => handleOptionSelect(test._id, optionLabel)}
										className='mr-2'
									/>
									{optionLabel}. {opt}
								</label>
							)
						})}
					</div>
				</div>
			))}
			<button
				onClick={handleSubmit}
				className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
			>
				Submit Quiz
			</button>
		</div>
	)
}

export default StudentQuiz

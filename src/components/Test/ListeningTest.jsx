import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ListeningTest = () => {
	const [test, setTest] = useState(null)
	const [answers, setAnswers] = useState({})
	const navigate = useNavigate()
	const token = sessionStorage.getItem('token')

	useEffect(() => {
		const fetchTest = async () => {
			try {
				const res = await axios.get(
					'https://a2-test-backend.onrender.com/api/listening-tests',
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				if (res.data.length > 0) {
					setTest(res.data[3]) // Show first test for now
				}
			} catch (err) {
				console.error(err)
				alert('Failed to fetch test.')
			}
		}
		fetchTest()
	}, [])

	const handleOptionSelect = (qIdx, option) => {
		setAnswers(prev => ({ ...prev, [qIdx]: option }))
	}

	const handleSubmit = async () => {
		let correctCount = 0
		test.questions.forEach((q, idx) => {
			if (answers[idx] === q.correctAnswer) {
				correctCount++
			}
		})

		const score = Math.round((correctCount * 100) / test.questions.length)

		try {
			await axios.post(
				'https://a2-test-backend.onrender.com/api/results/submit',
				{
					testType: 'listening',
					score,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			alert(`Submitted! Your score: ${score}%`)
			navigate('/student-dashboard')
		} catch (err) {
			console.error(err)
			alert('Submission failed.')
		}
	}

	if (!test) return <div>Loading...</div>

	return (
		<div className='bg-white shadow p-6 rounded-lg'>
			<h2 className='text-xl font-bold mb-4'>{test.title}</h2>
			<audio
				controls
				src={`https://a2-test-backend.onrender.com/uploads/${test.audioUrl}`}
			/>

			{test.questions.map((q, idx) => (
				<div key={idx} className='mb-4'>
					<p className='font-semibold'>{q.questionText}</p>
					<div className='mt-2 space-y-1'>
						{q.options.map((opt, optIdx) => {
							const optionLabel = String.fromCharCode(65 + optIdx)
							return (
								<label key={optIdx} className='block'>
									<input
										type='radio'
										name={`question-${idx}`}
										value={optionLabel}
										checked={answers[idx] === optionLabel}
										onChange={() => handleOptionSelect(idx, optionLabel)}
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
				className='bg-blue-500 text-white px-4 py-2 rounded'
			>
				Submit Answers
			</button>
		</div>
	)
}

export default ListeningTest

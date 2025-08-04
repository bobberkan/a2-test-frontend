import axios from 'axios'
import { useEffect, useState } from 'react'

const StudentQuiz = () => {
	const [tests, setTests] = useState([])
	const [answers, setAnswers] = useState({})
	const token = sessionStorage.getItem('token')

	const fetchTests = async () => {
		const res = await axios.get(
			'https://a2-test-backend.onrender.com/api/tests',
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		setTests(res.data)
	}

	useEffect(() => {
		fetchTests()
	}, [])

	const handleOptionSelect = (questionId, option) => {
		setAnswers(prev => ({ ...prev, [questionId]: option }))
	}

	const handleSubmit = async () => {
		let correctCount = 0
		tests.forEach(test => {
			if (answers[test._id] === test.correctAnswer) correctCount++
		})

		const score = (correctCount * 100) / tests.length

		try {
			await axios.post(
				'https://a2-test-backend.onrender.com/api/results/submit',
				{ testType: 'listening', score },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			alert(`Test submitted successfully! Your score: ${score}%`)
		} catch (err) {
			alert(err.response?.data?.message || 'Submission failed')
		}
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

import axios from 'axios'
import { useState } from 'react'

const ManageListeningTests = () => {
	const [title, setTitle] = useState('')
	const [audioFile, setAudioFile] = useState(null)
	const [questions, setQuestions] = useState([
		{ question: '', options: ['', '', '', ''], correctAnswer: 'A' },
	])

	const token = sessionStorage.getItem('token')
	// console.log('TOKEN:', sessionStorage.getItem('token'))
	

	const handleFileChange = e => {
		setAudioFile(e.target.files[0])
	}

	const handleQuestionChange = (index, field, value) => {
		const newQuestions = [...questions]
		newQuestions[index][field] = value
		setQuestions(newQuestions)
	}

	const handleOptionChange = (qIdx, optIdx, value) => {
		const newQuestions = [...questions]
		newQuestions[qIdx].options[optIdx] = value
		setQuestions(newQuestions)
	}

	const addQuestion = () => {
		setQuestions([
			...questions,
			{ question: '', options: ['', '', '', ''], correctAnswer: 'A' },
		])
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('title', title)
		formData.append('audio', audioFile)
		formData.append('questions', JSON.stringify(questions))

		try {
			await axios.post(
				'https://a2-test-backend.onrender.com/api/listening-tests',
				formData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			alert('Listening Test Uploaded!')
			// Clear form
			setTitle('')
			setAudioFile(null)
			setQuestions([
				{ question: '', options: ['', '', '', ''], correctAnswer: 'A' },
			])
		} catch (err) {
			alert('Upload failed.')
		}
	}

	return (
		<div>
			<h2 className='text-xl font-semibold mb-4'>Upload Listening Test</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<input
					type='text'
					placeholder='Test Title'
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='border px-3 py-2 w-full rounded'
					required
				/>
				<input
					type='file'
					accept='audio/*'
					onChange={handleFileChange}
					className='border px-3 py-2 w-full rounded'
					required
				/>

				{questions.map((q, qIdx) => (
					<div key={qIdx} className='border p-4 rounded space-y-2'>
						<input
							type='text'
							placeholder={`Question ${qIdx + 1}`}
							value={q.question}
							onChange={e =>
								handleQuestionChange(qIdx, 'question', e.target.value)
							}
							className='border px-3 py-2 w-full rounded'
							required
						/>
						{q.options.map((opt, optIdx) => (
							<input
								key={optIdx}
								type='text'
								placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
								value={opt}
								onChange={e => handleOptionChange(qIdx, optIdx, e.target.value)}
								className='border px-3 py-2 w-full rounded'
								required
							/>
						))}
						<select
							value={q.correctAnswer}
							onChange={e =>
								handleQuestionChange(qIdx, 'correctAnswer', e.target.value)
							}
							className='border px-3 py-2 w-full rounded'
						>
							<option value='A'>A</option>
							<option value='B'>B</option>
							<option value='C'>C</option>
							<option value='D'>D</option>
						</select>
					</div>
				))}
				<button
					type='button'
					onClick={addQuestion}
					className='bg-green-500 text-white px-4 py-2 rounded'
				>
					Add Question
				</button>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded'
				>
					Upload Test
				</button>
			</form>
		</div>
	)
}

export default ManageListeningTests

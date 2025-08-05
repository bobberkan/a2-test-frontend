import axios from 'axios'
import { useEffect, useState } from 'react'

const ManageListeningTests = () => {
	const [title, setTitle] = useState('')
	const [audioFile, setAudioFile] = useState(null)
	const [questions, setQuestions] = useState([
		{ questionText: '', options: ['', '', '', ''], correctAnswer: 'A' },
	])
	const [tests, setTests] = useState([])

	const token = sessionStorage.getItem('token')

	useEffect(() => {
		fetchTests()
	}, [])

	const fetchTests = async () => {
		try {
			const res = await axios.get(
				'https://a2-test-backend.onrender.com/api/listening-tests',
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			setTests(res.data)
		} catch (err) {
			console.error(err)
			alert('Failed to fetch tests')
		}
	}

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
			{ questionText: '', options: ['', '', '', ''], correctAnswer: 'A' },
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
			setTitle('')
			setAudioFile(null)
			setQuestions([
				{ questionText: '', options: ['', '', '', ''], correctAnswer: 'A' },
			])
			fetchTests() // Refresh list
		} catch (err) {
			console.error(err)
			alert('Upload failed.')
		}
	}

	const handleDelete = async id => {
		if (window.confirm('Are you sure you want to delete this test?')) {
			try {
				await axios.delete(
					`https://a2-test-backend.onrender.com/api/listening-tests/${id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				alert('Test deleted')
				fetchTests()
			} catch (err) {
				console.error(err)
				alert('Failed to delete test.')
			}
		}
	}

	return (
		<div>
			<h2 className='text-xl font-semibold mb-4'>Manage Listening Tests</h2>

			<form onSubmit={handleSubmit} className='space-y-4 mb-10'>
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
							value={q.questionText}
							onChange={e =>
								handleQuestionChange(qIdx, 'questionText', e.target.value)
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

			<h3 className='text-lg font-semibold mb-4'>Existing Listening Tests</h3>
			<ul className='space-y-4'>
				{tests.map(test => (
					<li
						key={test._id}
						className='bg-white p-4 rounded shadow flex justify-between items-center'
					>
						<div>
							<h4 className='font-bold'>{test.title}</h4>
							<p className='text-sm text-gray-600'>
								{test.questions.length} Questions
							</p>
						</div>
						<button
							onClick={() => handleDelete(test._id)}
							className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ManageListeningTests

import axios from 'axios'
import { useEffect, useState } from 'react'

const ManageTests = () => {
	const [tests, setTests] = useState([])
	const [question, setQuestion] = useState('')
	const [options, setOptions] = useState(['', '', '', ''])
	const [correctAnswer, setCorrectAnswer] = useState('A')

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

	const handleCreate = async e => {
		e.preventDefault()
		await axios.post(
			'https://a2-test-backend.onrender.com/api/tests',
			{ question, options, correctAnswer },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		setQuestion('')
		setOptions(['', '', '', ''])
		setCorrectAnswer('A')
		fetchTests()
	}

	const handleDelete = async id => {
		await axios.delete(`https://a2-test-backend.onrender.com/api/tests/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		fetchTests()
	}

	const handleOptionChange = (index, value) => {
		const newOptions = [...options]
		newOptions[index] = value
		setOptions(newOptions)
	}

	return (
		<div>
			<h2 className='text-xl font-semibold mb-4'>Manage Tests</h2>

			<form onSubmit={handleCreate} className='mb-6 space-y-4'>
				<input
					type='text'
					placeholder='Question'
					value={question}
					onChange={e => setQuestion(e.target.value)}
					className='border px-3 py-2 w-full rounded'
					required
				/>
				{options.map((opt, idx) => (
					<input
						key={idx}
						type='text'
						placeholder={`Option ${String.fromCharCode(65 + idx)}`}
						value={opt}
						onChange={e => handleOptionChange(idx, e.target.value)}
						className='border px-3 py-2 w-full rounded'
						required
					/>
				))}
				<select
					value={correctAnswer}
					onChange={e => setCorrectAnswer(e.target.value)}
					className='border px-3 py-2 w-full rounded'
				>
					<option value='A'>A</option>
					<option value='B'>B</option>
					<option value='C'>C</option>
					<option value='D'>D</option>
				</select>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded w-full'
				>
					Add Test
				</button>
			</form>

			<ul className='space-y-2'>
				{tests.map(test => (
					<li
						key={test._id}
						className='bg-white p-4 rounded shadow flex justify-between items-center'
					>
						<div>
							<h3 className='font-semibold'>{test.question}</h3>
							<ul className='text-sm text-gray-600'>
								{test.options.map((opt, idx) => (
									<li key={idx}>
										{String.fromCharCode(65 + idx)}. {opt}
									</li>
								))}
							</ul>
							<p className='text-green-600 font-semibold'>
								Correct: {test.correctAnswer}
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

export default ManageTests

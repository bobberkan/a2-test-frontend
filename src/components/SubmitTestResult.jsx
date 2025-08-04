import axios from 'axios'
import { useState } from 'react'

const SubmitTestResult = () => {
	const [testType, setTestType] = useState('listening')
	const [score, setScore] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		const token = sessionStorage.getItem('token')

		try {
			await axios.post(
				'https://a2-test-backend.onrender.com/api/results/submit',
				{ testType, score },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			alert('Result submitted successfully!')
			setScore('')
		} catch (err) {
			alert(err.response?.data?.message || 'Submission failed')
		}
	}

	return (
		<div className='bg-white shadow p-6 rounded-lg mb-6'>
			<h2 className='text-xl font-bold mb-4'>Submit Test Result</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<select
					value={testType}
					onChange={e => setTestType(e.target.value)}
					className='border p-2 rounded w-full'
				>
					<option value='listening'>Listening</option>
					<option value='reading'>Reading</option>
					<option value='writing'>Writing</option>
					<option value='speaking'>Speaking</option>
				</select>
				<input
					type='number'
					placeholder='Score'
					value={score}
					onChange={e => setScore(e.target.value)}
					className='border p-2 rounded w-full'
					required
				/>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded w-full'
				>
					Submit Result
				</button>
			</form>
		</div>
	)
}

export default SubmitTestResult

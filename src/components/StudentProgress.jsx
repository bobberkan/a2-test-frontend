import axios from 'axios'
import { useEffect, useState } from 'react'

const StudentProgress = () => {
	const [results, setResults] = useState([])

	const fetchResults = async () => {
		const token = sessionStorage.getItem('token')
		const res = await axios.get(
			'https://a2-test-backend.onrender.com/api/results/all',
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		setResults(res.data)
	}

	useEffect(() => {
		fetchResults()
	}, [])

	return (
		<div>
			<h2 className='text-xl font-bold mb-4'>Student Progress</h2>
			<table className='min-w-full bg-white'>
				<thead>
					<tr>
						<th className='py-2 border'>Student</th>
						<th className='py-2 border'>Email</th>
						<th className='py-2 border'>Test Type</th>
						<th className='py-2 border'>Score</th>
						<th className='py-2 border'>Date</th>
					</tr>
				</thead>
				<tbody>
					{results.map(result => (
						<tr key={result._id}>
							<td className='py-2 border'>{result.student.name}</td>
							<td className='py-2 border'>{result.student.email}</td>
							<td className='py-2 border capitalize'>{result.testType}</td>
							<td className='py-2 border'>{result.score}%</td>
							<td className='py-2 border'>
								{new Date(result.submittedAt).toLocaleDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default StudentProgress

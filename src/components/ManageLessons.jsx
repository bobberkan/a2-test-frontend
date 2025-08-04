import axios from 'axios'
import { useEffect, useState } from 'react'

const ManageLessons = () => {
	const [lessons, setLessons] = useState([])
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const token = sessionStorage.getItem('token')

	const fetchLessons = async () => {
		const res = await axios.get(
			'https://a2-test-backend.onrender.com/api/lessons',
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		setLessons(res.data)
	}

	useEffect(() => {
		fetchLessons()
	}, [])

	const handleCreate = async e => {
		e.preventDefault()
		await axios.post(
			'https://a2-test-backend.onrender.com/api/lessons',
			{ title, description },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		setTitle('')
		setDescription('')
		fetchLessons()
	}

	const handleDelete = async id => {
		await axios.delete(
			`https://a2-test-backend.onrender.com/api/lessons/${id}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		fetchLessons()
	}

	return (
		<div>
			<h2 className='text-xl font-semibold mb-4'>Manage Lessons</h2>

			<form onSubmit={handleCreate} className='mb-6'>
				<input
					type='text'
					placeholder='Lesson Title'
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='border px-3 py-2 mr-2 rounded'
					required
				/>
				<input
					type='text'
					placeholder='Description'
					value={description}
					onChange={e => setDescription(e.target.value)}
					className='border px-3 py-2 mr-2 rounded'
				/>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded'
				>
					Add Lesson
				</button>
			</form>

			<ul className='space-y-2'>
				{lessons.map(lesson => (
					<li
						key={lesson._id}
						className='flex justify-between items-center bg-white p-4 shadow rounded'
					>
						<div>
							<h3 className='font-semibold'>{lesson.title}</h3>
							<p className='text-sm text-gray-600'>{lesson.description}</p>
						</div>
						<button
							onClick={() => handleDelete(lesson._id)}
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

export default ManageLessons

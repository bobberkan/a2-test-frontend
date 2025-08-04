import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('student') // Default 'student'
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post(
				'https://a2-test-backend.onrender.com/api/auth/register',
				{
					name,
					email,
					password,
					role, // Role ni yuboramiz
				}
			)
			alert('Registration successful! Please login.')
			navigate('/login')
		} catch (err) {
			alert(err.response.data.message || 'Registration failed')
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200'>
			<div className='backdrop-blur-md bg-white/30 shadow-lg rounded-xl p-10 w-full max-w-md'>
				<h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
					Register
				</h2>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<input
						type='text'
						placeholder='Name'
						value={name}
						onChange={e => setName(e.target.value)}
						className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
						required
					/>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
						required
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
						required
					/>
					<select
						value={role}
						onChange={e => setRole(e.target.value)}
						className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
					>
						<option value='student'>Student</option>
						<option value='teacher'>Teacher</option>
					</select>
					<button
						type='submit'
						className='w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition'
					>
						Register
					</button>
				</form>
			</div>
		</div>
	)
}

export default Register

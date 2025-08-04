import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const res = await axios.post(
				'https://a2-test-backend.onrender.com/api/auth/login',
				{
					email,
					password,
				}
			)
sessionStorage.setItem('token', res.data.token)
		sessionStorage.setItem('user', JSON.stringify(res.data.user))

			alert('Login successful!')

			// Role bo‘yicha yo‘naltirish:
			if (res.data.user.role === 'teacher') {
				navigate('/teacher-dashboard')
			} else {
				navigate('/student-dashboard')
			}
		} catch (err) {
			alert(err.response.data.message || 'Login failed')
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200'>
			<div className='backdrop-blur-md bg-white/30 shadow-lg rounded-xl p-10 w-full max-w-md'>
				<h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
					Login
				</h2>
				<form onSubmit={handleSubmit} className='space-y-6'>
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
					<button
						type='submit'
						className='w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition'
					>
						Login
					</button>
				</form>
				<p className='mt-4 text-center text-gray-600'>
					Don't have an account?{' '}
					<a href='/register' className='text-blue-500 hover:underline'>
						Register
					</a>
				</p>
			</div>
		</div>
	)
}

export default Login

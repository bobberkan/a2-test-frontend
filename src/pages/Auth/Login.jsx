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
			const res = await axios.post('http://localhost:5000/api/auth/login', {
				email,
				password,
			})
			localStorage.setItem('token', res.data.token)
			alert('Login successful!')
			navigate('/dashboard') // Dashboard page’ga yo‘naltiramiz
		} catch (err) {
			alert(err.response.data.message || 'Login failed')
		}
	}

	return (
		<div className='flex items-center justify-center h-screen'>
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm'
			>
				<h2 className='text-2xl mb-6 text-center font-bold'>Login</h2>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					className='border rounded w-full py-2 px-3 mb-4'
					required
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='border rounded w-full py-2 px-3 mb-4'
					required
				/>
				<button
					type='submit'
					className='bg-blue-500 text-white py-2 px-4 rounded w-full'
				>
					Login
				</button>
			</form>
		</div>
	)
}

export default Login

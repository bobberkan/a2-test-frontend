import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post('https://a2-test-backend.onrender.com', {
				name,
				email,
				password,
			})
			alert('Registration successful! Please login.')
			navigate('/login')
		} catch (err) {
			alert(err.response.data.message || 'Registration failed')
		}
	}

	return (
		<div className='flex items-center justify-center h-screen'>
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm'
			>
				<h2 className='text-2xl mb-6 text-center font-bold'>Register</h2>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={e => setName(e.target.value)}
					className='border rounded w-full py-2 px-3 mb-4'
					required
				/>
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
					className='bg-green-500 text-white py-2 px-4 rounded w-full'
				>
					Register
				</button>
			</form>
		</div>
	)
}

export default Register

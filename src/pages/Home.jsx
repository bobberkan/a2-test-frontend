import { useNavigate } from 'react-router-dom'

const Home = () => {
	const navigate = useNavigate()

	const startTest = () => {
		navigate('/listening')
	}

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white text-center px-4'>
			<h1 className='text-4xl md:text-6xl font-bold text-gray-800 mb-6'>
				Welcome to A2 Final Test Platform
			</h1>
			<p className='text-lg md:text-xl text-gray-600 mb-10'>
				Test your Listening, Reading, Writing, and Speaking skills like a real
				exam.
			</p>

			<div className='flex space-x-4 mb-6'>
				<button
					onClick={() => navigate('/login')}
					className='bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition shadow-md'
				>
					Login
				</button>
				<button
					onClick={() => navigate('/register')}
					className='bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition shadow-md'
				>
					Register
				</button>
			</div>

			<button
				onClick={startTest}
				className='bg-blue-600 text-white px-8 py-4 rounded-xl text-xl hover:bg-blue-700 transition shadow-lg'
			>
				Start Test
			</button>
		</div>
	)
}

export default Home

const TeacherDashboard = () => {
	const handleLogout = () => {
		localStorage.removeItem('token')
		window.location.href = '/login'
	}

	return (
		<div className='text-center mt-10'>
			<h1 className='text-3xl font-bold'>Teacher Dashboard</h1>
			<p className='mb-4'>Welcome to the Teacher Dashboard!</p>
			<button
				onClick={handleLogout}
				className='bg-red-500 text-white py-2 px-4 rounded'
			>
				Logout
			</button>
		</div>
	)
}

export default TeacherDashboard

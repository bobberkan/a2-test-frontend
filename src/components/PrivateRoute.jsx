import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, role }) => {
	const token = localStorage.getItem('token')
	const user = JSON.parse(localStorage.getItem('user')) // Login da user malumotini saqlaymiz

	if (!token) {
		return <Navigate to='/login' />
	}

	if (role && user?.role !== role) {
		return <Navigate to='/' />
	}

	return children
}

export default PrivateRoute

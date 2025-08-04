import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, role }) => {
const token = sessionStorage.getItem('token')
const user = JSON.parse(sessionStorage.getItem('user'))


	if (!token) {
		return <Navigate to='/login' />
	}

	if (role && user?.role !== role) {
		return <Navigate to='/' />
	}

	return children
}

export default PrivateRoute

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route
					path='/teacher-dashboard'
					element={
						<PrivateRoute role='teacher'>
							<TeacherDashboard />
						</PrivateRoute>
					}
				/>
				<Route
					path='/student-dashboard'
					element={
						<PrivateRoute role='student'>
							<StudentDashboard />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	)
}

export default App

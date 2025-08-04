import DashboardLayout from '../components/DashboardLayout'

const StudentDashboard = () => {
	const pages = {
		'My Lessons': (
			<div className='bg-white shadow p-6 rounded-lg'>
				<h3 className='text-lg font-semibold mb-2'>My Lessons</h3>
				<p>You have 5 lessons to complete this week.</p>
			</div>
		),
		'Upcoming Quizzes': (
			<div className='bg-white shadow p-6 rounded-lg'>
				<h3 className='text-lg font-semibold mb-2'>Upcoming Quizzes</h3>
				<p>Next quiz on Monday, 10:00 AM.</p>
			</div>
		),
	}

	return <DashboardLayout role='student' pages={pages} />
}

export default StudentDashboard

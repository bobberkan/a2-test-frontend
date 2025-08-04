import DashboardLayout from '../components/DashboardLayout'
import StudentQuiz from '../components/StudentQuiz' // <-- NEW
import SubmitTestResult from '../components/SubmitTestResult'

const StudentDashboard = () => {
	const pages = {
		'My Lessons': (
			<div>
				<div className='bg-white shadow p-6 rounded-lg mb-6'>
					<h3 className='text-lg font-semibold mb-2'>My Lessons</h3>
					<p>You have 5 lessons to complete this week.</p>
				</div>
				<StudentQuiz />
				<SubmitTestResult />
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

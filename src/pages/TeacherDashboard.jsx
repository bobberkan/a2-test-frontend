import DashboardLayout from '../components/DashboardLayout'
import ManageLessons from '../components/ManageLessons'
import ManageListeningTests from '../components/ManageListeningTests'
import ManageTests from '../components/ManageTests'
import StudentProgress from '../components/StudentProgress'

const TeacherDashboard = () => {
	const pages = {
		'Manage Lessons': <ManageLessons />,
		'Student Progress': <StudentProgress />,
		'Manage Tests': <ManageTests />,
		'Manage Listening Test': <ManageListeningTests />,
	}

	return <DashboardLayout role='teacher' pages={pages} />
}

export default TeacherDashboard

import DashboardLayout from '../components/DashboardLayout'
import ManageLessons from '../components/ManageLessons'
import StudentProgress from '../components/StudentProgress'
import ManageTests from '../components/ManageTests' // <-- NEW

const TeacherDashboard = () => {
	const pages = {
		'Manage Lessons': <ManageLessons />,
		'Student Progress': <StudentProgress />,
		'Manage Tests': <ManageTests /> // <-- NEW TAB
	}

	return <DashboardLayout role='teacher' pages={pages} />
}

export default TeacherDashboard

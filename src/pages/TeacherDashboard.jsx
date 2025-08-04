import DashboardLayout from '../components/DashboardLayout'
import ManageLessons from '../components/ManageTest'
import StudentProgress from '../components/StudentProgress' // (agar mavjud bo‘lsa)

const TeacherDashboard = () => {
	const pages = {
		'Manage Lessons': <ManageLessons />,
		'Student Progress': <StudentProgress />, // agar yo'q bo'lsa, vaqtinchalik <div>Student Progress</div> yoz
	}

	return <DashboardLayout role='teacher' pages={pages} />
}

export default TeacherDashboard

import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardLayout = ({ role, children, pages }) => {
	const navigate = useNavigate()
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [activePage, setActivePage] = useState(Object.keys(pages)[0]) // default page

	const user = JSON.parse(localStorage.getItem('user'))

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		navigate('/login')
	}

	return (
		<div className='flex h-screen bg-gray-100'>
			{/* Sidebar */}
			<div
				className={`bg-white shadow-md transition-all duration-300 ${
					isSidebarOpen ? 'w-64' : 'w-16'
				}`}
			>
				<div className='p-4 flex justify-between items-center'>
					<span className='font-bold text-xl'>
						{isSidebarOpen ? 'Dashboard' : 'D'}
					</span>
					<button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						<Menu className='w-6 h-6' />
					</button>
				</div>
				<div className='mt-6 space-y-4 px-4'>
					{Object.keys(pages).map(page => (
						<button
							key={page}
							className={`block w-full text-left p-2 rounded ${
								activePage === page ? 'bg-gray-200' : 'hover:bg-gray-100'
							}`}
							onClick={() => setActivePage(page)}
						>
							{page}
						</button>
					))}
				</div>
			</div>

			{/* Main Content */}
			<div className='flex-1 flex flex-col'>
				{/* Navbar */}
				<div className='bg-white shadow-md px-6 py-4 flex justify-between items-center'>
					<h1 className='text-xl font-semibold'>
						Welcome, {user?.name} ({role})
					</h1>
					<button
						onClick={handleLogout}
						className='flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
					>
						<LogOut className='w-5 h-5' /> Logout
					</button>
				</div>

				{/* Page Content */}
				<div className='p-6 overflow-auto'>{pages[activePage]}</div>
			</div>
		</div>
	)
}

export default DashboardLayout

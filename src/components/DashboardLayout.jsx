import { LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardLayout = ({ role, pages }) => {
	const navigate = useNavigate()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [activePage, setActivePage] = useState(Object.keys(pages)[0]) // default page

	const user = JSON.parse(sessionStorage.getItem('user'))

	const handleLogout = () => {
		sessionStorage.removeItem('token')
		sessionStorage.removeItem('user')
		navigate('/login')
	}

	return (
		<div className='flex h-screen bg-gray-100'>
			{/* Sidebar Overlay (Mobile) */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${
					isSidebarOpen
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				}`}
				onClick={() => setIsSidebarOpen(false)}
			></div>

			{/* Sidebar */}
			<div
				className={`fixed z-50 top-0 left-0 h-full bg-white shadow-md transform transition-transform duration-300 md:relative md:translate-x-0 ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} md:w-64 w-64`}
			>
				<div className='p-4 flex justify-between items-center border-b'>
					<span className='font-bold text-xl'>Dashboard</span>
					<button onClick={() => setIsSidebarOpen(false)} className='md:hidden'>
						<X className='w-6 h-6' />
					</button>
				</div>
				<div className='mt-6 space-y-2 px-4'>
					{Object.keys(pages).map(page => (
						<button
							key={page}
							className={`block w-full text-left p-2 rounded ${
								activePage === page ? 'bg-gray-200' : 'hover:bg-gray-100'
							}`}
							onClick={() => {
								setActivePage(page)
								setIsSidebarOpen(false) // Close sidebar on mobile after selection
							}}
						>
							{page}
						</button>
					))}
				</div>
			</div>

			{/* Main Content */}
			<div className='flex-1 flex flex-col'>
				{/* Navbar */}
				<div className='bg-white shadow-md px-4 py-4 flex justify-between items-center md:justify-end md:gap-4'>
					<button onClick={() => setIsSidebarOpen(true)} className='md:hidden'>
						<Menu className='w-6 h-6' />
					</button>
					<h1 className='text-lg font-semibold hidden md:block'>
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
				<div className='p-4 overflow-auto'>{pages[activePage]}</div>
			</div>
		</div>
	)
}

export default DashboardLayout

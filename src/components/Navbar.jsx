const Navbar = ({ currentSection, timer }) => {
	return (
		<nav className='w-full h-16 flex items-center justify-between px-4 md:px-8 bg-white shadow-md fixed top-0 z-50'>
			{/* Left: Logo */}
			<div className='text-xl font-bold text-blue-600'>A2 Test Platform</div>

			{/* Center: Current Section (optional) */}
			<div className='hidden md:block text-gray-700 text-lg font-medium'>
				{currentSection}
			</div>

			{/* Right: Timer and Profile */}
			<div className='flex items-center gap-4'>
				<div className='bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold'>
					⏱ {timer}
				</div>
				<div className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold'>
					U
				</div>
			</div>
		</nav>
	)
}

export default Navbar

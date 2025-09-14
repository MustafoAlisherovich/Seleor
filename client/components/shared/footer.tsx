import Logo from './logo'

function Footer() {
	return (
		<footer className='text-gray-200 py-12 text-center'>
			<div className='flex flex-col items-center gap-2'>
				<Logo />
				<p className='text-sm text-gray-400'>
					© {new Date().getFullYear()} My E-Commerce. All rights reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer

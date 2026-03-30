import Logo from './logo'

function Footer() {
	return (
		<footer className='container mx-auto mt-20 max-w-7xl px-4 pb-10'>
			<div className='premium-shell flex flex-col items-center justify-between gap-6 px-6 py-8 text-center md:flex-row md:text-left'>
				<div className='flex flex-col gap-3'>
					<Logo />
					<p className='max-w-md text-sm text-muted-foreground'>
						Curated pieces, cleaner shopping, and a more refined premium storefront experience.
					</p>
				</div>
				<div className='text-sm text-muted-foreground'>
					© {new Date().getFullYear()} Seleor. All rights reserved.
				</div>
			</div>
		</footer>
	)
}

export default Footer

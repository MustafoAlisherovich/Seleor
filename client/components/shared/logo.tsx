import Link from 'next/link'

function Logo() {
	return (
		<Link href={'/'}>
			<h1 className='text-2xl md:text-3xl font-extrabold tracking-wide text-primary'>
				E-Commerce
			</h1>
		</Link>
	)
}

export default Logo

import Link from 'next/link'

function Logo() {
	return (
		<Link href='/' className='group inline-flex items-center gap-3'>
			<div className='flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-400 text-sm font-black text-white shadow-[0_16px_40px_-20px_rgba(59,130,246,0.9)] transition-transform duration-300 group-hover:scale-105'>
				S
			</div>
			<div className='flex flex-col leading-none'>
				<span className='text-lg font-extrabold uppercase text-foreground md:text-xl'>
					Seleor
				</span>
				<span className='text-[10px] font-medium uppercase text-muted-foreground'>
					Online Clothing Store
				</span>
			</div>
		</Link>
	)
}

export default Logo

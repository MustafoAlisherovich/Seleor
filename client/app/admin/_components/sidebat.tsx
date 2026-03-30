'use client'

import { Button } from '@/components/ui/button'
import { adminSidebar } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Sidebar() {
	const pathname = usePathname()

	return (
		<div className='fixed left-0 top-[96px] z-30 w-[290px] px-4 max-md:w-24'>
			<div className='premium-shell p-4'>
				<h1 className='px-2 text-xl font-bold tracking-tight'>Admin</h1>
				<div className='mt-4 flex flex-col space-y-2'>
					{adminSidebar.map(item => (
						<Button
							key={item.route}
							asChild
							variant={pathname == item.route ? 'default' : 'ghost'}
							className={cn('justify-start gap-3 rounded-2xl', pathname == item.route && 'font-bold')}
						>
							<Link href={item.route}>
								<item.icon />
								<span>{item.name}</span>
							</Link>
						</Button>
					))}
				</div>
			</div>
		</div>
	)
}

export default Sidebar

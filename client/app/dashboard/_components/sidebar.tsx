'use client'

import { Button } from '@/components/ui/button'
import { dashboardSidebar } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Sidebar() {
	const pathname = usePathname()

	return (
		<div className='sticky top-[76px] z-40 px-3 py-3 sm:px-4 md:fixed md:left-0 md:top-[96px] md:w-[290px] md:py-0'>
			<div className='premium-shell p-2 sm:p-3 md:p-4'>
				<h1 className='hidden px-2 text-xl font-bold tracking-tight md:block'>Dashboard</h1>
				<div className='custom-scrollbar flex gap-2 overflow-x-auto md:mt-4 md:flex-col md:overflow-visible'>
					{dashboardSidebar.map(item => (
						<Button
							key={item.route}
							asChild
							variant={pathname == item.route ? 'default' : 'ghost'}
							className={cn(
								'min-w-12 justify-center gap-2 rounded-lg px-3 md:min-w-0 md:justify-start md:gap-3',
								pathname == item.route && 'font-bold'
							)}
						>
							<Link href={item.route} className='flex items-center'>
								<item.icon className='h-4 w-4' />
								<span className='hidden whitespace-nowrap sm:inline'>{item.name}</span>
							</Link>
						</Button>
					))}
				</div>
			</div>
		</div>
	)
}

export default Sidebar

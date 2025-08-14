'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { dashboardSidebar } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Sidebar() {
	const pathname = usePathname()

	return (
		<div className='fixed inset-0 mt-[10vh] h-[90vh] w-[300px] max-md:w-24 p-4 shadow-md'>
			<div className='mt-6 px-4 max-md:px-2'>
				<h1 className='font-semibold text-xl'>Dashboard</h1>
				<Separator className='my-2' />
				<div className='flex flex-col space-y-3 mt-4'>
					{dashboardSidebar.map(item => (
						<Button
							key={item.route}
							asChild
							variant={pathname == item.route ? 'secondary' : 'ghost'}
							className={cn(
								'flex justify-start',
								pathname == item.route && 'font-bold text-primary'
							)}
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

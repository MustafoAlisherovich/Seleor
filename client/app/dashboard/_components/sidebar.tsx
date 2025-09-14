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
		<div className='fixed inset-0 mt-[8vh] h-[90vh] w-[300px] max-md:w-16 p-2'>
			<div className='mt-4 px-2 max-md:px-1'>
				<h1 className='font-semibold text-xl max-md:hidden'>Dashboard</h1>
				<Separator className='my-2 max-md:hidden' />

				<div className='flex flex-col space-y-2 mt-2'>
					{dashboardSidebar.map(item => (
						<Button
							key={item.route}
							asChild
							variant={pathname == item.route ? 'secondary' : 'ghost'}
							className={cn(
								'flex gap-2',
								'max-md:justify-center max-md:w-10', // 📱 mobile tugma yanada kichkina
								pathname == item.route && 'font-bold text-primary'
							)}
						>
							<Link href={item.route} className='flex items-center'>
								<item.icon className='h-4 w-4' />{' '}
								{/* 📌 icon ham biroz kichraytirilgan */}
								<span className='max-md:hidden'>{item.name}</span>
							</Link>
						</Button>
					))}
				</div>
			</div>
		</div>
	)
}

export default Sidebar

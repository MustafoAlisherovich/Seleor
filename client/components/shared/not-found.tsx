'use client'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Link from 'next/link'

interface Props {
	showBtn?: boolean
}

export default function NoProductsFound({ showBtn }: Props) {
	return (
		<div className='flex flex-col items-center justify-center py-10'>
			<div className='premium-shell w-full max-w-xl rounded-[32px] p-4'>
				<div className='flex flex-col items-center justify-center space-y-6 p-8 text-center'>
					<div className='flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary'>
						<Search className='size-7' />
					</div>
					<div>
						<h2 className='text-2xl font-semibold tracking-tight'>No products found</h2>
						<p className='mt-2 text-sm leading-6 text-muted-foreground'>
							We couldn&apos;t find any items matching your search or selected category.
						</p>
					</div>

					{showBtn && (
						<Link href='/'>
							<Button className='gap-2'>
								<Search className='h-4 w-4' />
								Browse all products
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

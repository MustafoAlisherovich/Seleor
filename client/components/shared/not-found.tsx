'use client'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Link from 'next/link'

interface Props {
	showBtn?: boolean
}

export default function NoProductsFound({ showBtn }: Props) {
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='w-full max-w-md rounded-2xl text-center'>
				<div className='flex flex-col items-center justify-center p-8 space-y-6'>
					<div>
						<h2 className='text-xl font-semibold'>No Products Found</h2>
						<p className='text-muted-foreground mt-2'>
							We couldn’t find any products matching your search or category.
						</p>
					</div>

					{showBtn && (
						<Link href='/'>
							<Button className='gap-2'>
								<Search className='w-4 h-4' />
								Browse All Products
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

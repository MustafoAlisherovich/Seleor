'use client'

import { categories } from '@/constants'
import { cn, formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'

function CategoryBar() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const selectedCategory = searchParams.get('category') || ''

	const onCategoryChange = (value: string) => {
		const newUrl = formUrlQuery({
			key: 'category',
			params: searchParams.toString(),
			value,
		})
		router.push(newUrl, { scroll: false })
	}

	return (
		<div className='w-full md:w-auto overflow-x-auto'>
			<div className='flex items-center gap-2 min-w-max px-2'>
				{categories.map(category => (
					<Button
						key={category}
						className={cn(
							'px-4 py-2 rounded-full border hover:bg-primary hover:text-white cursor-pointer transition-colors whitespace-nowrap',
							category === selectedCategory && 'bg-primary text-white'
						)}
						variant='outline'
						size='lg'
						onClick={() => onCategoryChange(category)}
					>
						{category}
					</Button>
				))}
			</div>
		</div>
	)
}

export default CategoryBar

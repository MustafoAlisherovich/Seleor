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
		<div className='custom-scrollbar w-full overflow-x-auto pb-1 lg:w-auto'>
			<div className='flex min-w-max items-center gap-2'>
				{categories.map(category => (
					<Button
						key={category}
						className={cn(
							'whitespace-nowrap border border-white/60 bg-white/80 px-3 shadow-sm backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-primary hover:text-white sm:px-4',
							category === selectedCategory && 'bg-primary text-white',
						)}
						variant='outline'
						size='sm'
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

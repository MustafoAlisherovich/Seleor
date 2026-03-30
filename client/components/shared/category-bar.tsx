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
		<div className='w-full overflow-x-auto md:w-auto custom-scrollbar'>
			<div className='flex min-w-max items-center gap-2'>
				{categories.map(category => (
					<Button
						key={category}
						className={cn(
							'rounded-full border border-white/60 bg-white/70 px-4 shadow-sm backdrop-blur-sm transition-all whitespace-nowrap hover:border-primary/20 hover:bg-primary hover:text-white',
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

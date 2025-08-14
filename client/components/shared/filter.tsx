'use client'

import { categories } from '@/constants'
import { cn, formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

interface Props {
	showCategory?: boolean
}

function Filter({ showCategory = false }: Props) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const onFilterChange = (value: string) => {
		const newUrl = formUrlQuery({
			key: 'filter',
			params: searchParams.toString(),
			value,
		})
		router.push(newUrl)
	}

	const onCategoryChange = (value: string) => {
		const newUrl = formUrlQuery({
			key: 'category',
			params: searchParams.toString(),
			value,
		})
		router.push(newUrl)
	}

	return (
		<div
			className={cn('grid grid-cols-1 gap-2', showCategory && 'grid-cols-2')}
		>
			<Select onValueChange={onFilterChange}>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Select filter' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='oldest'>Oldest</SelectItem>
					<SelectItem value='newest'>Newest</SelectItem>
				</SelectContent>
			</Select>

			{showCategory && (
				<Select onValueChange={onCategoryChange}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select category' />
					</SelectTrigger>
					<SelectContent>
						{categories.map(category => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</div>
	)
}

export default Filter

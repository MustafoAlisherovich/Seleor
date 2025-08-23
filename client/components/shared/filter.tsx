'use client'

import { categories } from '@/constants'
import { cn, formUrlQuery, removeUrlQuery } from '@/lib/utils'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback } from 'react'
import { Input } from '../ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

interface Props {
	showSearch?: boolean
	showCategory?: boolean
}
const Filter: FC<Props> = ({ showSearch, showCategory }) => {
	const searchParams = useSearchParams()
	const router = useRouter()

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

	const onInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const newUrl = formUrlQuery({
			key: 'q',
			params: searchParams.toString(),
			value,
		})
		router.push(newUrl)

		if (value === '') {
			const newUrl = removeUrlQuery({
				key: 'q',
				params: searchParams.toString(),
			})
			router.push(newUrl)
		}
	}

	const handleSearchDebounce = useCallback(debounce(onInputSearch, 300), [])

	return (
		<div
			className={cn(
				'gap-1 max-md:w-full grid',
				showSearch && showCategory ? 'grid-cols-3' : 'grid-cols-2',
				'max-md:grid-cols-1'
			)}
		>
			{showSearch && (
				<div className='flex items-center bg-secondary border w-full'>
					<Input
						placeholder='Search'
						className='text-xs border-none no-focus flex-1'
						onChange={handleSearchDebounce}
					/>
					<Search className='mr-2 cursor-pointer text-muted-foreground' />
				</div>
			)}

			<Select onValueChange={onFilterChange}>
				<SelectTrigger className='bg-secondary text-xs w-full'>
					<SelectValue
						placeholder='Select filter'
						className='text-muted-foreground'
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='newest'>Newest</SelectItem>
					<SelectItem value='oldest'>Oldest</SelectItem>
				</SelectContent>
			</Select>

			{showCategory && (
				<Select onValueChange={onCategoryChange}>
					<SelectTrigger className='bg-secondary text-xs w-full'>
						<SelectValue
							placeholder='Select category'
							className='text-muted-foreground'
						/>
					</SelectTrigger>
					<SelectContent>
						{categories.map(category => (
							<SelectItem value={category} key={category}>
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

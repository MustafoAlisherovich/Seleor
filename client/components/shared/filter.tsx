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
			const cleanUrl = removeUrlQuery({
				key: 'q',
				params: searchParams.toString(),
			})
			router.push(cleanUrl)
		}
	}

	const handleSearchDebounce = useCallback(debounce(onInputSearch, 300), [])

	return (
		<div
			className={cn(
				'grid w-full gap-3',
				showSearch && showCategory ? 'md:grid-cols-3' : 'md:grid-cols-2',
			)}
		>
			{showSearch && (
				<div className='flex items-center gap-2 rounded-lg border border-white/60 bg-white/75 px-3 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5'>
					<Search className='text-muted-foreground size-4' />
					<Input
						placeholder='Search...'
						className='h-11 border-none bg-transparent px-0 shadow-none no-focus'
						onChange={handleSearchDebounce}
					/>
				</div>
			)}

			<Select onValueChange={onFilterChange}>
				<SelectTrigger className='h-12 rounded-lg border-white/60 bg-white/75 text-sm shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5'>
					<SelectValue
						placeholder='Sort by'
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
					<SelectTrigger className='h-12 rounded-lg border-white/60 bg-white/75 text-sm shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5'>
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

'use client'

import { formUrlQuery, removeUrlQuery } from '@/lib/utils'
import { debounce } from 'lodash'
import { Search as SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function GlobalSearch() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const onInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const newUrl = formUrlQuery({
			key: 'q',
			params: searchParams.toString(),
			value,
		})

		router.push(newUrl)

		if (value == '') {
			const newUrl = removeUrlQuery({
				key: 'q',
				params: searchParams.toString(),
			})
			router.push(newUrl)
		}
	}

	const handleSearchDebounce = useCallback(debounce(onInputSearch, 300), [])

	return (
		<div className='relative flex items-center w-full max-w-md'>
			<Input
				type='text'
				placeholder='Search...'
				className='pr-20'
				onChange={handleSearchDebounce}
			/>

			<Button size='icon' variant={'ghost'} className='absolute right-1'>
				<SearchIcon size={18} />
			</Button>
		</div>
	)
}

export default GlobalSearch

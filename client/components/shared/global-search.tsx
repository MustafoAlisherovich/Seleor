'use client'

import { Search as SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function GlobalSearch() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const [value, setValue] = useState(searchParams.get('q') || '')

	const handleSearch = () => {
		if (value.trim()) {
			router.push(`/search?q=${encodeURIComponent(value)}`)
		} else {
			router.push(`/search`)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleSearch()
		}
	}

	return (
		<div className='relative flex items-center w-full max-w-md'>
			<Input
				type='text'
				placeholder='Search...'
				className='pr-20'
				value={value}
				onChange={e => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
			/>

			<Button
				size='icon'
				variant='ghost'
				className='absolute right-1'
				onClick={handleSearch}
			>
				<SearchIcon size={18} />
			</Button>
		</div>
	)
}

export default GlobalSearch

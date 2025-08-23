'use client'

import { Search as SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function GlobalSearch() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const [value, setValue] = useState(searchParams.get('q') || '')
	const [history, setHistory] = useState<string[]>([])
	const [showHistory, setShowHistory] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('searchHistory')
		if (saved) {
			setHistory(JSON.parse(saved))
		}
	}, [])

	// Save to history
	const saveToHistory = (query: string) => {
		if (!query.trim()) return
		const updated = [query, ...history.filter(item => item !== query)].slice(
			0,
			5
		)
		setHistory(updated)
		localStorage.setItem('searchHistory', JSON.stringify(updated))
	}

	const handleSearch = () => {
		if (value.trim()) {
			saveToHistory(value.trim())
			router.push(`/search?q=${encodeURIComponent(value)}`)
			setShowHistory(false)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && value.trim()) {
			e.preventDefault()
			handleSearch()
		}
	}

	const handleSelectHistory = (item: string) => {
		setValue(item)
		router.push(`/search?q=${encodeURIComponent(item)}`)
		setShowHistory(false)
	}

	return (
		<div className='relative flex flex-col items-center w-full max-w-md'>
			<div className='relative flex items-center w-full'>
				<Input
					type='text'
					placeholder='Search...'
					className='pr-20'
					value={value}
					onChange={e => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => setShowHistory(true)}
					onBlur={() => setTimeout(() => setShowHistory(false), 200)}
				/>

				<Button
					size='icon'
					variant='ghost'
					className='absolute right-1'
					onClick={handleSearch}
					disabled={!value.trim()}
				>
					<SearchIcon size={18} />
				</Button>
			</div>

			{/* Search history dropdown */}
			{showHistory && history.length > 0 && (
				<div className='absolute top-full mt-2 w-full bg-white border rounded-lg shadow-md z-10'>
					{history.map((item, idx) => (
						<div
							key={idx}
							onMouseDown={() => handleSelectHistory(item)} // blur bo'lsa ham ishlashi uchun
							className='px-4 py-2 cursor-pointer hover:bg-gray-100'
						>
							{item}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default GlobalSearch

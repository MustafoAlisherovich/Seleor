'use client'

import { Clock3, Search as SearchIcon } from 'lucide-react'
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

	const saveToHistory = (query: string) => {
		if (!query.trim()) return
		const updated = [query, ...history.filter(item => item !== query)].slice(
			0,
			5,
		)
		setHistory(updated)
		localStorage.setItem('searchHistory', JSON.stringify(updated))
	}

	const handleSearch = () => {
		if (value.trim()) {
			saveToHistory(value.trim())
			router.push(`/products?q=${encodeURIComponent(value)}`)
			router.refresh()
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
		router.push(`/products?q=${encodeURIComponent(item)}`)
		setShowHistory(false)
	}

	return (
		<div className='relative flex w-full max-w-2xl flex-col'>
			<div className='relative flex items-center'>
				<Input
					type='text'
					placeholder='Search for premium picks...'
					className='h-12 rounded-2xl border-white/60 bg-white/75 pr-14 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.7)] dark:bg-white/5'
					value={value}
					onChange={e => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => setShowHistory(true)}
					onBlur={() => setTimeout(() => setShowHistory(false), 200)}
				/>

				<Button
					size='icon'
					className='absolute right-1.5 size-9 rounded-xl'
					onClick={handleSearch}
					disabled={!value.trim()}
				>
					<SearchIcon size={18} />
				</Button>
			</div>

			{showHistory && history.length > 0 && (
				<div className='premium-shell absolute top-full z-20 mt-3 w-full overflow-hidden rounded-3xl p-2'>
					{history.map((item, idx) => (
						<div
							key={idx}
							onMouseDown={() => handleSelectHistory(item)}
							className='flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-accent/80'
						>
							<Clock3 className='size-4 text-muted-foreground' />
							<span>{item}</span>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default GlobalSearch

'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
	const searchParams = useSearchParams()
	const query = searchParams.get('q') || ''

	return (
		<div className='py-28'>
			<h1 className='text-2xl font-bold'>Search results for: "{query}"</h1>
		</div>
	)
}

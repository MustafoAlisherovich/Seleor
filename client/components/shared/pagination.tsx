'use client'

import { formUrlQuery } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'

interface Props {
	pageNumber: number
	isNext: boolean
}

function Pagination({ isNext, pageNumber }: Props) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const onNavigation = (direction: 'prev' | 'next') => {
		const nextPageNumber = direction === 'prev' ? pageNumber - 1 : pageNumber + 1

		const newUrl = formUrlQuery({
			key: 'page',
			params: searchParams.toString(),
			value: nextPageNumber.toString(),
		})
		router.push(newUrl)
	}

	if (!isNext && pageNumber === 1) return null

	return (
		<div className='mt-8 flex w-full items-center justify-center gap-3'>
			<Button size='sm' variant='outline' onClick={() => onNavigation('prev')} disabled={pageNumber === 1}>
				<ChevronLeft className='size-4' /> Prev
			</Button>
			<div className='rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm'>
				{pageNumber}
			</div>
			<Button size='sm' variant='outline' onClick={() => onNavigation('next')} disabled={!isNext}>
				Next <ChevronRight className='size-4' />
			</Button>
		</div>
	)
}

export default Pagination

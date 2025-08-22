'use client'

import { getProducts } from '@/actions/user.actions'
import ProductCard from '@/components/card/product.card'
import { IProduct } from '@/types'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

type Props = {
	initialCount: number
	initialPage: number
	totalProducts: number
	initialQuery: string // searchParams.toString()
}

export default function LoadMore({
	initialCount,
	initialPage,
	totalProducts,
	initialQuery,
}: Props) {
	const [appended, setAppended] = useState<IProduct[]>([])
	const [page, setPage] = useState<number>(initialPage)
	const [loading, setLoading] = useState(false)

	const handleLoadMore = async () => {
		if (loading) return
		setLoading(true)

		const params = new URLSearchParams(initialQuery)
		const res = await getProducts({
			searchQuery: params.get('q') || '',
			filter: params.get('filter') || '',
			category: params.get('category') || '',
			page: String(page + 1),
		})

		const newProducts = res?.data?.products || []
		setAppended(prev => [...prev, ...newProducts])
		setPage(prev => prev + 1)
		setLoading(false)
	}

	const currentTotal = initialCount + appended.length

	return (
		<>
			{/* appended productlar shu grid ichida server-rendered productlardan keyin chiqadi */}
			{appended.map(product => (
				<ProductCard key={product._id} product={product} />
			))}

			{/* Tugma uchun col-span-full yordamida tugma grid ichida qatorni egallaydi */}
			{currentTotal < totalProducts && (
				<div className='flex justify-center mt-6 col-span-full'>
					{loading ? (
						<Loader2 className='text-primary size-14 animate-spin' />
					) : (
						<Button
							className='w-[40vw] h-[7vh] cursor-pointer'
							variant={'secondary'}
							onClick={handleLoadMore}
						>
							<span className='text-[16px] font-semibold'>Read More 12</span>
						</Button>
					)}
				</div>
			)}
		</>
	)
}

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
	initialQuery: string
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
			{appended.map(product => (
				<ProductCard key={product._id} product={product} />
			))}

			{currentTotal < totalProducts && (
				<div className='col-span-full mt-4 flex justify-center'>
					{loading ? (
						<Loader2 className='size-10 animate-spin text-primary' />
					) : (
						<Button className='min-w-[220px]' variant='outline' onClick={handleLoadMore}>
							Load more products
						</Button>
					)}
				</div>
			)}
		</>
	)
}

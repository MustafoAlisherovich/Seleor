'use client'

import { getProducts } from '@/actions/user.actions'
import ProductCard from '@/components/card/product.card'
import NotFound from '@/components/shared/not-found'
import { IProduct } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchPage() {
	const searchParams = useSearchParams()
	const [products, setProducts] = useState<IProduct[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const query = searchParams.get('q') || ''

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true)
			const res = await getProducts({
				searchQuery: query,
			})

			if (res?.data) {
				setProducts(res.data.products)
			}
			setIsLoading(false)
		}

		fetchProducts()
	}, [query])

	return (
		<div className='container max-w-7xl mx-auto p-4 py-28'>
			<h1 className='text-2xl font-bold mb-6'>Products</h1>

			{!isLoading && products.length === 0 ? (
				<NotFound />
			) : (
				<>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{products.map(product => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				</>
			)}
		</div>
	)
}

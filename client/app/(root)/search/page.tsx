'use client'

import { getProducts } from '@/actions/user.actions'
import ProductCard from '@/components/card/product.card'
import { Button } from '@/components/ui/button'
import { IProduct } from '@/types'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchPage() {
	const searchParams = useSearchParams()
	const query = searchParams.get('q') || ''

	const [products, setProducts] = useState<IProduct[]>([])
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [totalProducts, setTotalProducts] = useState(0)
	const pageSize = 8

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true)
			const res = await getProducts({
				searchQuery: query,
				page: String(page),
				pageSize: String(pageSize),
			})
			if (res?.data) {
				if (res?.data) {
					if (page === 1) {
						setProducts(res.data.products)
					} else {
						setProducts(prev => [...prev, ...(res?.data?.products || [])])
					}
					setTotalProducts(res.data.totalProducts)
				}
			}
			setIsLoading(false)
		}

		fetchProducts()
	}, [query, page])

	const loadMore = () => {
		setPage(prev => prev + 1)
	}

	return (
		<div className='container max-w-7xl mx-auto p-4 py-28'>
			<h1 className='text-2xl font-bold mb-6'>Search results for: "{query}"</h1>

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>

			{products.length < totalProducts && (
				<div className='flex justify-center mt-8'>
					{isLoading ? (
						<Loader2 className='animate-spin size-14 text-primary' />
					) : (
						<Button
							className='w-[40vw] h-[7vh] cursor-pointer border'
							variant={'secondary'}
							onClick={loadMore}
						>
							<span className='text-[16px] font-semibold'>Read More</span>
						</Button>
					)}
				</div>
			)}
		</div>
	)
}

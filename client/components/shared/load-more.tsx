'use client'

import { getProducts } from '@/actions/user.actions'
import ProductCard from '@/components/card/product.card'
import { Button } from '@/components/ui/button'
import UseAction from '@/hooks/use-action'
import { IProduct } from '@/types'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface Props {
	initialProducts: IProduct[]
	totalProducts: number
	pageSize: number
}

export default function ProductsList({
	initialProducts,
	totalProducts,
	pageSize,
}: Props) {
	const [products, setProducts] = useState<IProduct[]>(initialProducts)
	const [page, setPage] = useState(1)
	const { isLoading, setIsLoading } = UseAction()

	const loadMore = async () => {
		setIsLoading(true)
		const nextPage = page + 1
		const res = await getProducts({
			page: String(nextPage),
			pageSize: String(pageSize),
		}).finally(() => setIsLoading(false))

		setProducts(prev => [...prev, ...(res?.data?.products ?? [])])
		setPage(nextPage)
	}

	return (
		<div>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>

			{products.length < totalProducts && (
				<div className='flex justify-center mt-8'>
					{isLoading ? (
						<Loader2 className='animate-spin size-14 text-muted-foreground' />
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

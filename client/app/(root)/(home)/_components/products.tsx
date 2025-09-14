'use client'

import ProductCard from '@/components/card/product.card'
import CategoryBar from '@/components/shared/category-bar'
import LoadMore from '@/components/shared/load-more'
import NoProductsFound from '@/components/shared/not-found'
import { Separator } from '@/components/ui/separator'
import { IProduct } from '@/types'
import { AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

interface Props {
	products: IProduct[]
	totalProducts: number
}

function Products({ products, totalProducts }: Props) {
	const searchParams = useSearchParams()

	return (
		<section id='products' className='container max-w-7xl mx-auto p-6 py-8'>
			<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
				<h1 className='text-3xl font-bold'>Products</h1>

				<CategoryBar />
			</div>

			<Separator className='my-6' />

			{products.length === 0 && <NoProductsFound />}
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				<AnimatePresence>
					{products.map(product => (
						<ProductCard key={product._id} product={product} />
					))}
				</AnimatePresence>

				<LoadMore
					initialCount={products.length}
					initialPage={1}
					totalProducts={totalProducts}
					initialQuery={searchParams.toString()}
					key={searchParams.toString()}
				/>
			</div>
		</section>
	)
}

export default Products

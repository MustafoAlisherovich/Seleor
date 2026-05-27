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
		<section id='products' className='container mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-10'>
			<div className='premium-shell p-4 sm:p-6 md:p-8'>
				<div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
					<div>
						<h2 className='section-title'>Featured products</h2>
						<p className='section-subtitle'>
							Explore a cleaner catalog layout with curated product cards and smoother browsing.
						</p>
					</div>
					<CategoryBar />
				</div>

				<Separator className='my-5 opacity-60 sm:my-6' />

				{products.length === 0 && <NoProductsFound />}
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5'>
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
			</div>
		</section>
	)
}

export default Products

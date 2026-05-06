'use client'

import ProductCard from '@/components/card/product.card'
import { IProduct } from '@/types'
import { AnimatePresence } from 'framer-motion'

interface Props {
	products: IProduct[]
}

export default function ProductsList({ products }: Props) {
	return (
		<div className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			<AnimatePresence>
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</AnimatePresence>
		</div>
	)
}

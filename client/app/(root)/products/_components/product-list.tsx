'use client'

import ProductCard from '@/components/card/product.card'
import { IProduct } from '@/types'
import { AnimatePresence } from 'framer-motion'

interface Props {
	products: IProduct[]
}

export default function ProductsList({ products }: Props) {
	return (
		<AnimatePresence>
			{products.map(product => (
				<ProductCard key={product._id} product={product} />
			))}
		</AnimatePresence>
	)
}

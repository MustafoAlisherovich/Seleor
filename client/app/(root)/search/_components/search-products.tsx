'use client'

import ProductCard from '@/components/card/product.card'
import { IProduct } from '@/types'
import { AnimatePresence } from 'framer-motion'

interface Props {
	products: IProduct[]
}

function SearchProducts({ products }: Props) {
	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
			<AnimatePresence>
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</AnimatePresence>
		</div>
	)
}

export default SearchProducts

import ProductCard from '@/components/card/product.card'
import { IProduct } from '@/types'

interface Props {
	products: IProduct[]
}

export default function ProductsList({ products }: Props) {
	return (
		<>
			{products.map(product => (
				<ProductCard key={product._id} product={product} />
			))}
		</>
	)
}

import ProductCard from '@/components/card/product.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { products } from '@/constants'

function Page() {
	return (
		<div className='container max-w-7xl mx-auto p-4 py-24'>
			<div className='flex justify-between items-center flex-wrap gap-3'>
				<h1 className='text-xl font-bold'>Products</h1>
				<Filter showCategory />
			</div>

			<Separator className='my-3' />

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>

			<div className='mt-6 flex justify-center'>
				<Pagination />
			</div>
		</div>
	)
}

export default Page

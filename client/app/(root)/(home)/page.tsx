import { getProducts } from '@/actions/user.actions'
import ProductCard from '@/components/card/product.card'
import Filter from '@/components/shared/filter'
import LoadMore from '@/components/shared/load-more'
import { Separator } from '@/components/ui/separator'
import { SearchParams } from '@/types'
import Carousel from './_components/carousel'

interface Props {
	searchParams: SearchParams
}

const Page = async (props: Props) => {
	const searchParams = await props.searchParams

	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		category: `${searchParams.category || ''}`,
		page: '1',
	})

	const products = res?.data?.products || []
	const totalProducts = res?.data?.totalProducts || 0

	return (
		<div className='container max-w-7xl mx-auto p-4 py-24'>
			<Carousel />
			<div className='flex justify-between items-center flex-wrap gap-3'>
				<h1 className='text-xl font-bold'>Products</h1>
				<Filter showCategory />
			</div>

			<Separator className='my-3' />

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}

				<LoadMore
					initialCount={products.length}
					initialPage={1}
					totalProducts={totalProducts}
					initialQuery={searchParams.toString()}
					key={searchParams.toString()}
				/>
			</div>
		</div>
	)
}

export default Page

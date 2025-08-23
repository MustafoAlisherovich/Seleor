import { getProducts } from '@/actions/user.actions'
import ProductCard from '@/components/card/product.card'
import Filter from '@/components/shared/filter'
import LoadMore from '@/components/shared/load-more'
import { Separator } from '@/components/ui/separator'
import { SearchParams } from '@/types'

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
		<div className='container max-w-7xl mx-auto p-6 py-24'>
			<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
				<h1 className='text-2xl font-bold'>Products</h1>

				<div className='flex items-center gap-3 w-full md:w-auto'>
					<Filter showCategory />
				</div>
			</div>

			<Separator className='my-6' />

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

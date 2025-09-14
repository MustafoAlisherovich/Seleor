import { getProducts } from '@/actions/user.actions'
import NotFound from '@/components/shared/not-found'
import { SearchParams } from '@/types'
import SearchProducts from './_components/search-products'

interface Props {
	searchParams: SearchParams
}

export default async function SearchPage(props: Props) {
	const searchParams = await props.searchParams

	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		page: '1',
	})

	const products = res?.data?.products || []

	return (
		<div className='container max-w-7xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-8 text-center md:text-left'>
				Products
			</h1>

			{products.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-16'>
					<NotFound showBtn />
				</div>
			) : (
				<SearchProducts products={products} />
			)}
		</div>
	)
}

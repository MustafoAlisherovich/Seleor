import { getProducts } from '@/actions/user.actions'
import NotFound from '@/components/shared/not-found'
import { SearchParams } from '@/types'
import ProductsList from './_components/product-list'

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
		<div className='container mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-10'>
			<div className='premium-shell p-4 sm:p-6 md:p-8'>
				<h1 className='section-title'>Products Catalog</h1>
				<p className='section-subtitle'>
					A cleaner catalog layout for easier product discovery.
				</p>

				{products.length === 0 ? (
					<div className='flex flex-col items-center justify-center py-16'>
						<NotFound showBtn />
					</div>
				) : (
					<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5 md:mt-8'>
						<ProductsList products={products} />
					</div>
				)}
			</div>
		</div>
	)
}

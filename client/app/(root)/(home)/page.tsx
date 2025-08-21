import { getProducts } from '@/actions/user.actions'
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
		page: `${searchParams.page || '1'}`,
	})

	const pageSize = 8

	const products = res?.data?.products || []
	const totalProducts = res?.data?.totalProducts || 0

	return (
		<div className='container max-w-7xl mx-auto p-4 py-24'>
			<div className='flex justify-between items-center flex-wrap gap-3'>
				<h1 className='text-xl font-bold'>Products</h1>
				<Filter showCategory />
			</div>

			<Separator className='my-3' />

			<LoadMore
				initialProducts={products}
				totalProducts={totalProducts}
				pageSize={pageSize}
			/>
		</div>
	)
}

export default Page

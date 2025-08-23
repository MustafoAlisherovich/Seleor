import { getFavourites } from '@/actions/user.actions'
import WishlistCard from '@/components/card/wishlist.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { SearchParams } from '@/types'

interface Props {
	searchParams: SearchParams
}

const Page = async (props: Props) => {
	const searchParams = await props.searchParams
	const res = await getFavourites({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
		category: `${searchParams.category || ''}`,
	})

	const products = res?.data?.products
	const isNext = res?.data?.isNext || false
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Wishlist</h1>
				<Filter showCategory showSearch />
			</div>

			<Separator className='my-3' />

			{products && products.length === 0 && (
				<div className='text-center mt-3 '>No products found.</div>
			)}

			<div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-3'>
				{products &&
					products.map(product => (
						<WishlistCard key={product._id} product={product} />
					))}
			</div>

			<Pagination
				isNext={isNext}
				pageNumber={searchParams?.page ? +searchParams.page : 1}
			/>
		</>
	)
}

export default Page

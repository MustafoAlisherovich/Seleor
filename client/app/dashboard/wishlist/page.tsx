import WishlistCard from '@/components/card/wishlist.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { products } from '@/constants'

function Page() {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Payments</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-3'>
				{products.map(product => (
					<WishlistCard key={product._id} product={product} />
				))}
			</div>
		</>
	)
}

export default Page

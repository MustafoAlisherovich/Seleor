import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import AddProduct from '../_components/add-product'

const Loading = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Products</h1>
				<AddProduct />
			</div>

			<Separator className='my-3' />

			<Filter showSearch showCategory />

			<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-3'>
				{/* Loader */}
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className='space-y-3'>
						<Skeleton className='h-[250px] w-full rounded-2xl' />
						<div className='flex justify-between items-center'>
							<Skeleton className='h-4 w-2/3' />
							<Skeleton className='h-4 w-12' />
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default Loading

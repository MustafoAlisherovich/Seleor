import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import AddProduct from '../_components/add-product'

const Loading = () => {
	return (
		<>
			<div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<h1 className='text-xl font-bold'>Products</h1>
				<AddProduct />
			</div>

			<Separator className='my-3' />

			<Filter showSearch showCategory />

			<div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				{/* Loader */}
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className='space-y-3'>
						<Skeleton className='h-[250px] w-full rounded-lg' />
						<div className='flex items-center justify-between'>
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

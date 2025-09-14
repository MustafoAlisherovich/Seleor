import { Skeleton } from '../ui/skeleton'

function CardLoader() {
	return (
		<div className='cursor-pointer'>
			<div className='bg-secondary relative rounded-2xl shadow-md overflow-hidden'>
				<Skeleton className='h-[300px] w-[300px] mx-auto rounded-md' />

				<div className='absolute right-3 top-3 z-10'>
					<Skeleton className='h-9 w-9 rounded-full' />
				</div>
			</div>

			<div className='flex justify-between items-center mt-3 text-sm'>
				<Skeleton className='h-4 w-2/3 rounded-md' />
				<Skeleton className='h-4 w-16 rounded-md' />
			</div>
		</div>
	)
}

export default CardLoader

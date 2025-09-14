import { Skeleton } from '@/components/ui/skeleton'

function Loading() {
	return (
		<div className='flex flex-col lg:flex-row items-start justify-center gap-12 py-28 mx-auto max-w-6xl'>
			<div className='relative w-[350px] h-[500px] flex-shrink-0 bg-secondary/40 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center'>
				<Skeleton className='w-[300px] h-[450px] rounded-xl' />
			</div>

			<div className='flex flex-col space-y-4 max-w-md'>
				<Skeleton className='h-10 w-3/4 rounded-md' />
				<Skeleton className='h-6 w-24 rounded-md' />
				<Skeleton className='h-16 w-full rounded-md' />
				<Skeleton className='h-8 w-28 rounded-md' />
				<Skeleton className='h-12 w-full rounded-md' />
				<div className='space-y-2 pt-4 border-t'>
					<Skeleton className='h-3 w-2/3' />
					<Skeleton className='h-3 w-1/2' />
					<Skeleton className='h-3 w-1/3' />
				</div>
			</div>
		</div>
	)
}

export default Loading

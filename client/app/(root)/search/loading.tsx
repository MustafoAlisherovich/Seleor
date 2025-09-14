import { Skeleton } from '@/components/ui/skeleton'

function Loading() {
	return (
		<div className='container max-w-7xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-8 text-center md:text-left'>
				Products
			</h1>

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
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
		</div>
	)
}

export default Loading

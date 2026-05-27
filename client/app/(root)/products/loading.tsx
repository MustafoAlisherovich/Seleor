import { Skeleton } from '@/components/ui/skeleton'

function Loading() {
	return (
		<div className='container mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-10'>
			<div className='premium-shell p-4 sm:p-6 md:p-8'>
				<div className='space-y-3'>
					<Skeleton className='h-10 w-64' />
					<Skeleton className='h-5 w-full max-w-md' />
				</div>

				<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5 md:mt-8'>
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index}
							className='overflow-hidden rounded-lg border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5'
						>
							<div className='relative mb-4'>
								<Skeleton className='h-[220px] w-full rounded-md' />
							</div>

							<div className='space-y-3'>
								<Skeleton className='h-4 w-24 rounded-full' />
								<Skeleton className='h-6 w-full max-w-[220px]' />
								<Skeleton className='h-4 w-20' />

								<div className='pt-2'>
									<Skeleton className='h-10 w-full rounded-lg' />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Loading

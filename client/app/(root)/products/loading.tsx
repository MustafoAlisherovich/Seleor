import { Skeleton } from '@/components/ui/skeleton'

function Loading() {
	return (
		<div className='container mx-auto max-w-7xl px-4 py-8 md:py-12'>
			<div className='premium-shell p-6 md:p-8'>
				<div className='space-y-3'>
					<Skeleton className='h-10 w-64' />
					<Skeleton className='h-5 w-full max-w-md' />
				</div>

				<div className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index}
							className='overflow-hidden rounded-[28px] border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5'
						>
							<div className='relative mb-4'>
								<Skeleton className='h-[220px] w-full rounded-[22px]' />
							</div>

							<div className='space-y-3'>
								<Skeleton className='h-4 w-24 rounded-full' />
								<Skeleton className='h-6 w-full max-w-[220px]' />
								<Skeleton className='h-4 w-20' />

								<div className='pt-2'>
									<Skeleton className='h-10 w-full rounded-xl' />
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

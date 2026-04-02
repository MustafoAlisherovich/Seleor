import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import Link from 'next/link'

function Loading() {
	return (
		<div className='container mx-auto max-w-7xl px-4 py-8 md:py-12'>
			<div className='premium-shell p-6 md:p-8 lg:p-10'>
				<div className='mb-6 flex items-center justify-between gap-4'>
					<Link
						href='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
					>
						<ArrowLeft className='h-4 w-4' />
						Back to store
					</Link>
				</div>

				<div className='grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]'>
					<div className='relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-white to-secondary/70 p-6 shadow-[0_30px_90px_-45px_rgba(59,130,246,0.55)] dark:border-white/10 dark:from-white/5 dark:to-white/10'>
						<div className='relative h-[360px] md:h-[520px]'>
							<Skeleton className='h-full w-full rounded-[24px]' />
						</div>
					</div>

					<div className='flex flex-col space-y-5'>
						<div className='space-y-4'>
							<Skeleton className='h-7 w-28 rounded-full' />
							<Skeleton className='h-12 w-full max-w-[420px]' />
							<Skeleton className='h-12 w-full max-w-[520px]' />

							<div className='space-y-2 pt-1'>
								<Skeleton className='h-4 w-full max-w-xl' />
								<Skeleton className='h-4 w-full max-w-lg' />
								<Skeleton className='h-4 w-full max-w-md' />
							</div>
						</div>

						<div className='rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5'>
							<div className='flex items-center justify-between gap-4'>
								<div className='w-full'>
									<Skeleton className='h-3 w-16' />
									<Skeleton className='mt-3 h-10 w-40' />
								</div>
							</div>

							<div className='mt-6 space-y-3'>
								<Skeleton className='h-11 w-full rounded-xl' />
								<Skeleton className='h-11 w-full rounded-xl' />
							</div>
						</div>

						<div className='grid gap-3 sm:grid-cols-3'>
							<div className='rounded-2xl border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-white/5'>
								<Truck className='mb-2 size-5 text-primary/40' />
								<Skeleton className='h-4 w-24' />
								<Skeleton className='mt-2 h-3 w-full' />
								<Skeleton className='mt-1 h-3 w-4/5' />
							</div>

							<div className='rounded-2xl border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-white/5'>
								<ShieldCheck className='mb-2 size-5 text-primary/40' />
								<Skeleton className='h-4 w-28' />
								<Skeleton className='mt-2 h-3 w-full' />
								<Skeleton className='mt-1 h-3 w-4/5' />
							</div>

							<div className='rounded-2xl border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-white/5'>
								<Sparkles className='mb-2 size-5 text-primary/40' />
								<Skeleton className='h-4 w-24' />
								<Skeleton className='mt-2 h-3 w-full' />
								<Skeleton className='mt-1 h-3 w-4/5' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Loading

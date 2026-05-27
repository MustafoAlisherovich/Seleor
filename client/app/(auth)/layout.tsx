import { ChildProps } from '@/types'

function Layout({ children }: ChildProps) {
	return (
		<section className='container mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center justify-center px-3 py-6 sm:px-4 sm:py-8 lg:py-10'>
			<div className='grid w-full items-center gap-6 lg:grid-cols-[1fr_minmax(420px,520px)] lg:gap-8'>
				<div className='hidden lg:block'>
					<div className='premium-shell relative overflow-hidden p-8 xl:p-10'>
						<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_30%),linear-gradient(135deg,rgba(16,185,129,0.10),transparent_34%)]' />
						<div className='relative max-w-lg space-y-5'>
							<p className='text-xs font-semibold uppercase text-primary'>
								Seleor
							</p>
							<h1 className='text-5xl font-black tracking-tight'>
								Your premium destination for curated products
							</h1>
							<p className='text-base leading-7 text-muted-foreground'>
								A refreshed storefront experience with softer surfaces, elegant
								spacing, and stronger product focus.
							</p>
						</div>
					</div>
				</div>
				<div>{children}</div>
			</div>
		</section>
	)
}

export default Layout

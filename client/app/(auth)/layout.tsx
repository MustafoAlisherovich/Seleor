import { ChildProps } from '@/types'

function Layout({ children }: ChildProps) {
	return (
		<section className='container mx-auto flex min-h-[calc(100vh-120px)] max-w-7xl items-center justify-center px-4 py-10'>
			<div className='grid w-full items-center gap-8 lg:grid-cols-[1fr_520px]'>
				<div className='hidden lg:block'>
					<div className='premium-shell relative overflow-hidden p-10'>
						<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_25%)]' />
						<div className='relative max-w-lg space-y-5'>
							<p className='text-xs font-semibold uppercase tracking-[0.26em] text-primary'>
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

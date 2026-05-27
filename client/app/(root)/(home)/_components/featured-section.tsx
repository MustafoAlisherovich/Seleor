import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { features } from '@/constants'

function FeaturedSection() {
	return (
		<section className='container mx-auto max-w-7xl px-3 py-6 sm:px-4 md:py-8'>
			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4'>
				{features.map((item, i) => {
					const Icon = item.icon
					return (
						<Card key={i} className='group gap-3 p-0 transition-transform duration-300 hover:-translate-y-1'>
							<CardHeader className='items-start px-4 pt-4 sm:px-5 sm:pt-5'>
								<div className='mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-12'>
									<Icon className='size-5' />
								</div>
								<CardTitle className='text-lg'>{item.title}</CardTitle>
							</CardHeader>
							<CardContent className='px-4 pb-4 sm:px-5 sm:pb-5'>
								<p className='text-sm leading-6 text-muted-foreground'>{item.desc}</p>
							</CardContent>
						</Card>
					)
				})}
			</div>
		</section>
	)
}

export default FeaturedSection

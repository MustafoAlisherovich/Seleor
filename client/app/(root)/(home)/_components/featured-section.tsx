import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { features } from '@/constants'

function FeaturedSection() {
	return (
		<section className='container mx-auto hidden max-w-7xl px-4 py-8 md:block'>
			<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
				{features.map((item, i) => {
					const Icon = item.icon
					return (
						<Card key={i} className='group gap-4 p-0 transition-transform duration-300 hover:-translate-y-1'>
							<CardHeader className='items-start px-6 pt-6'>
								<div className='mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
									<Icon className='size-5' />
								</div>
								<CardTitle className='text-lg'>{item.title}</CardTitle>
							</CardHeader>
							<CardContent className='px-6 pb-6'>
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

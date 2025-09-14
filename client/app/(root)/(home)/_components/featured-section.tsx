import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { features } from '@/constants'

function FeaturedSection() {
	return (
		<div className='container max-w-7xl mx-auto p-6 py-8 hidden md:block'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{features.map((item, i) => {
					const Icon = item.icon
					return (
						<Card
							key={i}
							className='group rounded-2xl shadow-sm hover:shadow-md transition-all p-6 text-center'
						>
							<CardHeader className='flex flex-col items-center'>
								<div className='p-3 rounded-full bg-primary/10 text-primary mb-3'>
									<Icon className='w-6 h-6' />
								</div>
								<CardTitle className='text-lg font-semibold'>
									{item.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>{item.desc}</p>
							</CardContent>
						</Card>
					)
				})}
			</div>
		</div>
	)
}

export default FeaturedSection

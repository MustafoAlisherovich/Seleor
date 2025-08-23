'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { carouselItems } from '@/constants'
import useEmblaCarousel from 'embla-carousel-react'

function Carousel() {
	const [emblaRef] = useEmblaCarousel({ loop: true })

	return (
		<div className='overflow-hidden' ref={emblaRef}>
			<div className='flex'>
				{carouselItems.map(product => (
					<div className='min-w-[80%] md:min-w-[33.33%] p-4' key={product.id}>
						<Card className='rounded-2xl shadow-md'>
							<CardContent className='p-4 flex flex-col items-center'>
								<img
									src={product.img}
									alt={product.title}
									className='rounded-xl object-cover h-48 w-full'
								/>
								<h3 className='mt-2 text-lg font-semibold'>{product.title}</h3>
								<p className='text-sm text-gray-500'>{product.price}</p>

								<Dialog>
									<DialogTrigger asChild>
										<Button className='mt-3 w-full'>View Details</Button>
									</DialogTrigger>
									<DialogContent>
										<img
											src={product.img}
											alt={product.title}
											className='rounded-xl mb-4'
										/>
										<h2 className='text-xl font-bold'>{product.title}</h2>
										<p className='text-gray-500'>{product.desc}</p>
										<p className='text-lg font-semibold mt-2'>
											{product.price}
										</p>
										<Button className='mt-4 w-full'>Buy Now</Button>
									</DialogContent>
								</Dialog>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</div>
	)
}

export default Carousel

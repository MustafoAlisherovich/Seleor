'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Hero() {
	return (
		<section className='container mx-auto max-w-7xl px-3 pt-4 sm:px-4 md:pt-8'>
			<div className='relative overflow-hidden rounded-lg border border-white/50 bg-white/75 px-4 py-8 shadow-[0_18px_60px_-38px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:px-6 md:px-8 md:py-12 dark:border-white/10 dark:bg-white/5'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_30%),linear-gradient(135deg,rgba(16,185,129,0.10),transparent_34%)]' />
				<div className='relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10'>
					<div className='max-w-2xl'>
						<div className='mb-4 inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase text-primary sm:mb-5'>
							<Sparkles className='size-3.5' />
							Premium collection
						</div>
						<h1 className='text-3xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl'>
							Refined shopping for{' '}
							<span className='text-primary'>modern living</span>
						</h1>
						<p className='mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base'>
							Discover premium essentials, elevated styling, and a storefront
							experience that feels cleaner, faster, and more luxurious.
						</p>
						<div className='mt-7 flex flex-col gap-3 sm:flex-row md:mt-8'>
							<Link href='#products' className='w-full sm:w-auto'>
								<Button size='lg' className='w-full sm:w-auto'>
									Shop now
									<ArrowRight className='size-4' />
								</Button>
							</Link>
							<Link href='/products' className='w-full sm:w-auto'>
								<Button
									size='lg'
									variant='outline'
									className='w-full sm:w-auto'
								>
									Explore catalog
								</Button>
							</Link>
						</div>
						<div className='mt-7 grid gap-3 sm:grid-cols-3 md:mt-8'>
							<div className='rounded-lg border border-white/60 bg-white/70 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
								<Truck className='mb-3 size-5 text-primary' />
								<p className='text-sm font-semibold'>Fast delivery</p>
								<p className='mt-1 text-xs text-muted-foreground'>
									Smooth checkout and quick shipping flow.
								</p>
							</div>
							<div className='rounded-lg border border-white/60 bg-white/70 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
								<ShieldCheck className='mb-3 size-5 text-primary' />
								<p className='text-sm font-semibold'>Secure payments</p>
								<p className='mt-1 text-xs text-muted-foreground'>
									Reliable and safe purchase experience.
								</p>
							</div>
							<div className='rounded-lg border border-white/60 bg-white/70 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
								<Sparkles className='mb-3 size-5 text-primary' />
								<p className='text-sm font-semibold'>Curated design</p>
								<p className='mt-1 text-xs text-muted-foreground'>
									A cleaner and more premium shopping vibe.
								</p>
							</div>
						</div>
					</div>
					<div className='relative min-w-0'>
						<div className='relative overflow-hidden rounded-lg border border-white/60 bg-white/75 p-2 shadow-[0_24px_70px_-42px_rgba(59,130,246,0.7)] backdrop-blur-xl sm:p-3 dark:border-white/10 dark:bg-white/5'>
							<div className='relative h-[260px] overflow-hidden rounded-md sm:h-[340px] md:h-[460px]'>
								<Image
									src='/heroImg.jpg'
									alt='Hero image'
									fill
									sizes='(min-width: 1024px) 42vw, 100vw'
									className='object-cover'
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero

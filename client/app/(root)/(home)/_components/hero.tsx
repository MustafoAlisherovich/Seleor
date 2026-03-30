'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Hero() {
	return (
		<section className='container mx-auto max-w-7xl px-4 pt-6 md:pt-10'>
			<div className='premium-shell relative overflow-hidden px-6 py-10 md:px-10 md:py-14'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.18),transparent_22%)]' />
				<div className='relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
					<div className='max-w-2xl'>
						<div className='mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
							<Sparkles className='size-3.5' />
							Premium collection
						</div>
						<h1 className='text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl'>
							Refined shopping for{' '}
							<span className='text-primary'>modern living</span>
						</h1>
						<p className='mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base'>
							Discover premium essentials, elevated styling, and a storefront
							experience that feels cleaner, faster, and more luxurious.
						</p>
						<div className='mt-8 flex flex-col gap-3 sm:flex-row'>
							<Link href='#products'>
								<Button size='lg' className='w-full sm:w-auto'>
									Shop now
									<ArrowRight className='size-4' />
								</Button>
							</Link>
							<Link href='/products'>
								<Button
									size='lg'
									variant='outline'
									className='w-full sm:w-auto'
								>
									Explore catalog
								</Button>
							</Link>
						</div>
						<div className='mt-8 grid gap-3 sm:grid-cols-3'>
							<div className='rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
								<Truck className='mb-3 size-5 text-primary' />
								<p className='text-sm font-semibold'>Fast delivery</p>
								<p className='mt-1 text-xs text-muted-foreground'>
									Smooth checkout and quick shipping flow.
								</p>
							</div>
							<div className='rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
								<ShieldCheck className='mb-3 size-5 text-primary' />
								<p className='text-sm font-semibold'>Secure payments</p>
								<p className='mt-1 text-xs text-muted-foreground'>
									Reliable and safe purchase experience.
								</p>
							</div>
							<div className='rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
								<Sparkles className='mb-3 size-5 text-primary' />
								<p className='text-sm font-semibold'>Curated design</p>
								<p className='mt-1 text-xs text-muted-foreground'>
									A cleaner and more premium shopping vibe.
								</p>
							</div>
						</div>
					</div>
					<div className='relative'>
						<div className='absolute inset-0 scale-95 rounded-[32px] bg-gradient-to-tr from-primary/20 via-transparent to-blue-300/20 blur-2xl' />
						<div className='relative overflow-hidden rounded-[32px] border border-white/60 bg-white/75 p-4 shadow-[0_30px_90px_-40px_rgba(59,130,246,0.8)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5'>
							<div className='relative h-[320px] overflow-hidden rounded-[24px] md:h-[460px]'>
								<Image
									src='/heroImg.jpg'
									alt='Hero image'
									fill
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

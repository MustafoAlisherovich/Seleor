'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

function Hero() {
	return (
		<div className='relative w-full h-auto md:h-[80vh] bg-secondary'>
			{/* Desktop image */}
			<div className='hidden md:block absolute inset-0'>
				<Image
					src='/heroImg.jpg'
					alt='Hero image'
					fill
					className='object-cover'
					priority
				/>
			</div>

			{/* Content */}
			<div className='relative flex items-center justify-center md:justify-start h-[60vh] md:h-full'>
				<div className='text-center md:text-left px-4 md:ml-[10%] max-w-2xl text-black md:text-white'>
					<h2 className='text-3xl md:text-6xl font-bold drop-shadow-lg'>
						Welcome to Our Store
					</h2>
					<p className='mt-3 text-base md:text-2xl drop-shadow'>
						Best products, best prices
					</p>
					<Link href='#products'>
						<Button
							className='mt-5 md:mt-6 w-40 md:w-60 h-11 md:h-13 cursor-pointer'
							size='lg'
						>
							<span className='text-lg md:text-xl'>View Products</span>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Hero

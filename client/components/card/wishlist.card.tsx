'use client'

import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

interface Props {
	product: Partial<IProduct>
}

function WishlistCard({ product }: Props) {
	return (
		<div className='border relative flex flex-col'>
			<div className='bg-secondary relative'>
				<Image
					src={product.image!}
					width={200}
					height={200}
					className='mx-auto'
					alt={product.title!}
				/>
				<Button
					size={'icon'}
					className='absolute right-0 top-0 z-50 flex items-center'
				>
					<Heart className='text-red-500 fill-red-500' />
				</Button>
			</div>

			<div className='p-2'>
				<div className='flex justify-between items-center text-sm'>
					<h1 className='font-bold'>{product.title}</h1>
					<p className='font-medium'>{formatPrice(+product.price!)}</p>
				</div>
				<p className='text-xs text-muted-foreground'>{product.description}</p>
			</div>
		</div>
	)
}

export default WishlistCard

'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { IProduct } from '@/types'
import { ArrowBigDownDash, ArrowBigUpDash, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface Props extends IProduct {}

function ShoppingCartCard(item: Props) {
	const { removeFromCart, increment, decrement } = useCart()

	return (
		<div className='grid w-full grid-cols-1 md:grid-cols-3 gap-4 rounded-md p-4 shadow-md dark:shadow-sm dark:shadow-white'>
			<div className='flex items-center gap-2 md:col-span-2'>
				<Image
					src={item.image}
					alt={item.title}
					width={120}
					height={90}
					className='rounded-sm object-cover'
				/>
				<div className='flex flex-col'>
					<h1 className='font-space-grotesk text-lg font-bold'>{item.title}</h1>
					<p className='line-clamp-2 text-sm text-muted-foreground'>
						{item.description}
					</p>
					<h1 className='font-space-grotesk font-bold md:hidden'>
						{(item.price * item.quantity).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</h1>
				</div>
			</div>

			<div className='flex flex-col md:flex-row md:items-center md:justify-end gap-3'>
				<div className='flex items-center gap-1'>
					<h1 className='font-space-grotesk text-xl font-bold'>
						{item.quantity}
					</h1>
					<div className='flex flex-col'>
						<ArrowBigUpDash
							className='transition-all hover:opacity-80 active:scale-125 cursor-pointer'
							role='button'
							onClick={() => increment(item._id)}
						/>
						<ArrowBigDownDash
							className='transition-all hover:opacity-80 active:scale-125 cursor-pointer'
							role='button'
							onClick={() =>
								item.quantity === 1
									? removeFromCart(item._id)
									: decrement(item._id)
							}
						/>
					</div>
				</div>

				<h1 className='font-space-grotesk text-xl font-bold hidden md:block'>
					{(item.price * item.quantity).toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</h1>

				<Button
					size='icon'
					className='w-full md:w-auto cursor-pointer bg-red-500 md:bg-secondary md:hover:bg-secondary/90'
					onClick={() => removeFromCart(item._id)}
				>
					<Trash2 className='size-5 md:text-red-500' />
				</Button>
			</div>
		</div>
	)
}

export default ShoppingCartCard

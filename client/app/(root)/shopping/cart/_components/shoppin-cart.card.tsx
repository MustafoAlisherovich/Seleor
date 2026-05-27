'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { IProduct } from '@/types'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface Props extends IProduct {}

function ShoppingCartCard(item: Props) {
	const { removeFromCart, increment, decrement } = useCart()

	return (
		<div className='grid w-full grid-cols-1 gap-4 rounded-lg border border-white/60 bg-white/75 p-3 shadow-sm backdrop-blur-sm sm:p-4 md:grid-cols-[1fr_auto] dark:border-white/10 dark:bg-white/5'>
			<div className='flex min-w-0 items-center gap-3 sm:gap-4'>
				<div className='shrink-0 overflow-hidden rounded-lg border border-white/60 bg-white p-2 sm:p-3 dark:border-white/10 dark:bg-white/5'>
					<Image src={item.image} alt={item.title} width={110} height={100} className='size-20 rounded-md object-contain sm:size-[110px]' />
				</div>
				<div className='flex min-w-0 flex-col gap-2'>
					<h1 className='line-clamp-2 text-base font-bold tracking-tight sm:text-lg'>{item.title}</h1>
					<p className='line-clamp-2 max-w-xl text-sm text-muted-foreground'>{item.description}</p>
					<h1 className='font-bold text-primary md:hidden'>
						{(item.price * item.quantity).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</h1>
				</div>
			</div>

			<div className='flex flex-row items-center justify-between gap-4 md:flex-col md:items-end'>
				<div className='flex items-center gap-2 rounded-lg border border-white/60 bg-background/80 px-2 py-1 shadow-sm'>
					<Button size='icon' variant='ghost' className='size-8 rounded-md' onClick={() => item.quantity === 1 ? removeFromCart(item._id) : decrement(item._id)}>
						<Minus className='size-4' />
					</Button>
					<span className='min-w-7 text-center text-sm font-bold'>{item.quantity}</span>
					<Button size='icon' variant='ghost' className='size-8 rounded-md' onClick={() => increment(item._id)}>
						<Plus className='size-4' />
					</Button>
				</div>

				<div className='flex items-center gap-3'>
					<h1 className='hidden text-xl font-bold text-primary md:block'>
						{(item.price * item.quantity).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</h1>
					<Button size='icon' variant='outline' className='text-red-500 hover:text-red-500' onClick={() => removeFromCart(item._id)}>
						<Trash2 className='size-4.5' />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ShoppingCartCard

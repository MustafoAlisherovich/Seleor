'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { IProduct } from '@/types'
import { useRouter } from 'next/navigation'

interface Props {
	product: IProduct
}

function Cart({ product }: Props) {
	const { addToCart } = useCart()
	const router = useRouter()

	const handleCartAction = (buyNow = false) => {
		addToCart(product)
		if (buyNow) {
			router.push('/shopping/cart')
		}
	}

	return (
		<div className='flex gap-4 pt-2'>
			<Button
				size='lg'
				className='cursor-pointer shadow-md'
				onClick={() => handleCartAction(false)}
			>
				Add to Cart
			</Button>
			<Button
				size='lg'
				variant='destructive'
				className='cursor-pointer shadow-md'
				onClick={() => handleCartAction(true)}
			>
				Buy Now
			</Button>
		</div>
	)
}

export default Cart

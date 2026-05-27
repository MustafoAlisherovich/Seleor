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
		<div className='flex flex-col gap-3 sm:flex-row'>
			<Button size='lg' className='w-full sm:min-w-[180px] sm:w-auto' onClick={() => handleCartAction(false)}>
				Add to cart
			</Button>
			<Button size='lg' variant='outline' className='w-full sm:min-w-[180px] sm:w-auto' onClick={() => handleCartAction(true)}>
				Buy now
			</Button>
		</div>
	)
}

export default Cart

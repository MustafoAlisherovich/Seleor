'use client'

import { stripeCheckout } from '@/actions/user.actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import UseAction from '@/hooks/use-action'
import { useCart } from '@/hooks/use-cart'
import { ArrowRight } from 'lucide-react'
import ShoppingCartCard from './_components/shoppin-cart.card'

function Cart() {
	const { isLoading, setIsLoading, onError } = UseAction()
	const { carts, totalPrice } = useCart()

	const onStripe = async () => {
		setIsLoading(true)

		const res = await stripeCheckout({
			cart: carts.map(item => ({
				productId: item._id,
				quantity: item.quantity,
				price: item.price,
			})),
		})

		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Something went wrong')
		}

		if (res.data.failure) {
			setIsLoading(false)
			return onError(res.data.failure)
		}

		if (res.data.status === 200) {
			window.location.href = res.data.checkoutUrl
		}
	}

	return (
		<div className='container mx-auto max-w-7xl px-4 py-8 md:py-12'>
			<div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
				<Card className='lg:col-span-2'>
					<CardContent className='py-6'>
						{carts.length > 0 ? (
							<>
								<h1 className='text-3xl font-bold tracking-tight'>Shopping cart</h1>
								<p className='mt-2 text-sm text-muted-foreground'>You have {carts.length} products in your cart.</p>
							</>
						) : (
							<div className='flex items-center justify-center py-16'>
								<p className='text-center text-2xl font-bold tracking-tight text-foreground md:text-4xl'>Your cart is empty</p>
							</div>
						)}

						<div className='my-5 flex flex-col space-y-4'>
							{carts.map(cart => (
								<ShoppingCartCard key={cart._id} {...cart} />
							))}
						</div>
					</CardContent>
				</Card>

				<div>
					<Card>
						<CardContent className='py-6'>
							<h1 className='text-2xl font-bold tracking-tight'>Order summary</h1>
							<p className='mt-2 text-sm text-muted-foreground'>Review total and continue to checkout.</p>

							<Separator className='my-5' />

							<div className='flex items-center justify-between text-sm'>
								<div className='font-semibold'>Total</div>
								<div className='text-lg font-bold text-primary'>
									{totalPrice().toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</div>
							</div>

							{carts.length ? (
								<Button className='group mt-5 flex w-full items-center justify-between' size='lg' disabled={isLoading} onClick={onStripe}>
									<span>
										{totalPrice().toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
									<div className='flex items-center gap-1 opacity-80 transition-all group-hover:opacity-100'>
										<span>Checkout</span>
										<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
									</div>
								</Button>
							) : null}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Cart

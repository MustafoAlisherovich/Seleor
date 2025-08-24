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
	const { carts, totalPrice, taxes } = useCart()

	const onStripe = async () => {
		setIsLoading(true)

		// zustand cartni olib, backendga yuboramiz
		const res = await stripeCheckout({
			cart: carts.map(item => ({
				productId: item._id,
				quantity: item.quantity,
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
		<div className='container mx-auto py-20 max-w-7xl'>
			<div className='grid grid-cols-3 gap-2 max-md:grid-cols-1'>
				<Card className='col-span-2 bg-gradient-to-t from-secondary to-background'>
					<CardContent className='py-4'>
						{carts.length > 0 && (
							<>
								<h1 className='font-space-grotesk text-2xl font-bold'>
									Shopping Cart
								</h1>
								<p className='text-sm text-muted-foreground'>
									You have {carts.length} products in your cart.
								</p>
							</>
						)}
						{carts.length === 0 && (
							<p className='mb-4 text-center text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
								Products Not Found
							</p>
						)}

						<div className='my-3 flex flex-col space-y-3'>
							{carts.map(cart => (
								<ShoppingCartCard key={cart._id} {...cart} />
							))}
						</div>
					</CardContent>
				</Card>

				<div>
					<Card className='bg-gradient-to-t from-secondary to-background'>
						<CardContent className='py-4'>
							<h1 className='font-space-grotesk text-2xl font-bold'>Results</h1>
							<p className='text-sm text-muted-foreground'>
								"Control the items in your cart."
							</p>

							<Separator className='my-3' />

							<div className='flex items-center justify-between text-sm'>
								<div className='font-space-grotesk font-bold'>Subtotal</div>
								<div className='font-medium'>
									{totalPrice().toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</div>
							</div>

							<div className='flex items-center justify-between text-sm'>
								<div className='font-space-grotesk font-bold'>Taxes</div>
								<div className='font-medium'>
									{taxes().toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</div>
							</div>

							<div className='flex items-center justify-between text-sm'>
								<div className='font-space-grotesk font-bold'>Total</div>
								<div className='font-medium'>
									{(totalPrice() + taxes()).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</div>
							</div>

							{carts.length ? (
								<Button
									className='group mt-3 flex w-full items-center justify-between px-2 font-space-grotesk font-bold'
									size={'lg'}
									disabled={isLoading}
									onClick={onStripe}
								>
									<span>
										{(totalPrice() + taxes()).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
									<div className='flex items-center gap-1 opacity-50 transition-all group-hover:opacity-100'>
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

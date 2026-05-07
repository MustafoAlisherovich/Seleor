'use client'

import { useCart } from '@/hooks/use-cart'
import { ShoppingCart, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CancelPage() {
	const carts = useCart(state => state.carts)

	const total = carts.reduce((acc, item) => acc + item.price * item.quantity, 0)

	return (
		<div className='min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-100 px-4 py-10'>
			<div className='mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl'>
				{/* Header */}
				<div className='relative overflow-hidden bg-red-600 px-8 py-10 text-white'>
					<div className='absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-white/10' />
					<div className='absolute bottom-0 left-0 h-32 w-32 -translate-x-10 translate-y-10 rounded-full bg-black/10' />

					<div className='relative z-10 flex flex-col items-center text-center'>
						<XCircle className='mb-4 h-16 w-16' />

						<h1 className='mb-3 text-3xl font-bold'>Payment Canceled</h1>

						<p className='max-w-md text-red-100'>
							Your payment was not completed. Your selected items are still
							saved in your cart.
						</p>
					</div>
				</div>

				{/* Products */}
				<div className='p-8'>
					<div className='mb-6 flex items-center gap-3'>
						<ShoppingCart className='h-6 w-6 text-gray-700' />

						<h2 className='text-2xl font-semibold text-gray-800'>
							Order Summary
						</h2>
					</div>

					<div className='space-y-5'>
						{carts.map(product => (
							<div
								key={product._id}
								className='group flex items-center gap-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:shadow-lg'
							>
								<div className='relative h-22 w-22 overflow-hidden rounded-2xl bg-white'>
									<Image
										src={product.image}
										alt={product.title}
										fill
										className='object-cover transition duration-300 group-hover:scale-105'
									/>
								</div>

								<div className='flex-1'>
									<h3 className='text-lg font-semibold text-gray-800'>
										{product.title}
									</h3>

									<p className='mt-1 text-sm text-gray-500'>
										Quantity: {product.quantity}
									</p>
								</div>

								<div className='text-right'>
									<p className='text-lg font-bold text-red-600'>
										${(product.price * product.quantity).toFixed(2)}
									</p>

									<p className='text-xs text-gray-400'>${product.price} each</p>
								</div>
							</div>
						))}
					</div>

					{/* Total */}
					<div className='mt-8 rounded-2xl bg-gray-900 p-6 text-white'>
						<div className='flex items-center justify-between'>
							<span className='text-lg text-gray-300'>Total Amount</span>

							<span className='text-xl font-bold'>${total.toFixed(2)}</span>
						</div>
					</div>

					{/* Buttons */}
					<div className='mt-8 flex flex-col gap-4 sm:flex-row'>
						<Link
							href='/shopping/cart'
							className='flex-1 rounded-2xl bg-blue-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-blue-700'
						>
							Try Payment Again
						</Link>

						<Link
							href='/dashboard'
							className='flex-1 rounded-2xl border border-gray-300 px-6 py-4 text-center font-semibold text-gray-700 transition hover:bg-gray-100'
						>
							Back to Dashboard
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

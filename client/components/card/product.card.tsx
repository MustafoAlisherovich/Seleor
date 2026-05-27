'use client'

import { addFavorite } from '@/actions/user.actions'
import UseAction from '@/hooks/use-action'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface Props {
	product: IProduct
}

function ProductCard({ product }: Props) {
	const { isLoading, setIsLoading, onError } = UseAction()
	const { addToCart } = useCart()

	const onFavorite = async () => {
		setIsLoading(true)
		const res = await addFavorite({ id: product._id })

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data?.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success('Added to favorite')
			setIsLoading(false)
		}
	}

	const addCart = () => {
		addToCart(product)
		toast.success('Successfully added')
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className='h-full cursor-pointer'
		>
			<div className='group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-lg border border-white/55 bg-white/80 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-40px_rgba(59,130,246,0.45)] sm:min-h-[390px] dark:border-white/10 dark:bg-white/5'>
				<div className='absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/10 to-transparent' />
				<div className='relative flex min-h-[210px] items-center justify-center overflow-hidden px-4 pt-8 sm:min-h-[240px] sm:px-6 sm:pt-10'>
					<Link
						href={`/product/${product._id}`}
						className='flex h-full w-full items-center justify-center'
					>
						<Image
							src={product.image!}
							width={220}
							height={220}
							className='h-auto max-h-[190px] w-auto object-contain transition-transform duration-500 group-hover:scale-105 sm:max-h-[220px]'
							alt={product.title!}
						/>
					</Link>
					<div className='absolute right-3 top-3 z-10 sm:right-4 sm:top-4'>
						<Button
							size='icon'
							variant='outline'
							className='rounded-lg border-white/70 bg-white/90 shadow-md hover:bg-white'
							disabled={isLoading}
							onClick={onFavorite}
						>
							<Heart className='size-4 text-rose-500' />
						</Button>
					</div>
				</div>

				<div className='mt-auto flex flex-1 flex-col gap-4 px-4 pb-4 sm:px-5 sm:pb-5'>
					<div className='space-y-2'>
						<Link href={`/product/${product._id}`}>
							<h1 className='line-clamp-2 min-h-12 text-base font-semibold tracking-tight sm:text-lg'>
								{product.title}
							</h1>
						</Link>
						<div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3'>
							<p className='truncate text-xs uppercase text-muted-foreground'>
								{product.category}
							</p>
							<p className='text-lg font-bold text-primary sm:text-xl'>
								{formatPrice(product.price!)}
							</p>
						</div>
					</div>
					<Button className='mt-auto w-full' onClick={addCart}>
						<ShoppingCart className='size-4.5' /> Add to cart
					</Button>
				</div>
			</div>
		</motion.div>
	)
}

export default ProductCard

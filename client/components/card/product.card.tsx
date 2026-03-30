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
			className='cursor-pointer'
		>
			<div className='group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[28px] border border-white/55 bg-white/75 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_34px_80px_-36px_rgba(59,130,246,0.45)] dark:border-white/10 dark:bg-white/5'>
				<div className='absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/10 to-transparent' />
				<div className='relative flex min-h-[240px] items-center justify-center overflow-hidden px-6 pt-10'>
					<Link
						href={`/product/${product._id}`}
						className='flex h-full w-full items-center justify-center'
					>
						<Image
							src={product.image!}
							width={220}
							height={220}
							className='max-h-[220px] object-contain transition-transform duration-500 group-hover:scale-105'
							alt={product.title!}
						/>
					</Link>
					<div className='absolute right-4 top-4 z-10'>
						<Button
							size='icon'
							variant='outline'
							className='rounded-full border-white/70 bg-white/90 shadow-md hover:bg-white'
							disabled={isLoading}
							onClick={onFavorite}
						>
							<Heart className='size-4 text-rose-500' />
						</Button>
					</div>
				</div>

				<div className='mt-auto flex flex-1 flex-col gap-4 px-5 pb-5'>
					<div className='space-y-2'>
						<Link href={`/product/${product._id}`}>
							<h1 className='line-clamp-1 text-lg font-semibold tracking-tight'>
								{product.title}
							</h1>
						</Link>
						<div className='flex items-center justify-between gap-3'>
							<p className='text-xs uppercase tracking-[0.22em] text-muted-foreground'>
								{product.category}
							</p>
							<p className='text-xl font-bold text-primary'>
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

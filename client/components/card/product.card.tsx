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
			<div className='relative group rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden min-h-[220px] sm:min-h-[250px] flex flex-col'>
				{/* Image section */}
				<div className='relative w-full h-40 sm:h-56 flex items-center justify-center bg-white'>
					<Link href={`/product/${product._id}`}>
						<Image
							src={product.image!}
							width={160}
							height={160}
							className='object-contain transition-transform duration-300 group-hover:scale-105 max-h-[140px] sm:max-h-[200px]'
							alt={product.title!}
						/>
					</Link>
					<div className='absolute right-2 top-2 sm:right-3 sm:top-3 z-10 transition-opacity'>
						<Button
							size='icon'
							className='cursor-pointer rounded-full bg-white shadow-md hover:bg-gray-100'
							disabled={isLoading}
							onClick={onFavorite}
						>
							<Heart className='size-4 sm:size-4 text-red-500' />
						</Button>
					</div>
				</div>

				{/* Title & Price */}
				<Link href={`/product/${product._id}`}>
					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center px-2 sm:px-3 mt-auto gap-1 sm:gap-2'>
						<h1 className='font-semibold text-sm sm:text-base line-clamp-1'>
							{product.title}
						</h1>
						<p className='text-sm sm:text-lg font-bold text-primary'>
							{formatPrice(product.price!)}
						</p>
					</div>
				</Link>
				{/* Add to Cart */}
				<div className='flex justify-center py-3 sm:py-4 px-2 sm:px-3'>
					<Button
						className='w-full h-7 sm:h-9 cursor-pointer sm:text-base'
						onClick={addCart}
					>
						<ShoppingCart className='size-4 sm:size-5' /> Add
					</Button>
				</div>
			</div>
		</motion.div>
	)
}

export default ProductCard

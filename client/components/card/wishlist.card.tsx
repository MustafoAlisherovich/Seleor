'use client'

import { deleteFavorite } from '@/actions/user.actions'
import UseAction from '@/hooks/use-action'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface Props {
	product: Partial<IProduct>
}

function WishlistCard({ product }: Props) {
	const { isLoading, setIsLoading, onError } = UseAction()

	async function onDelete() {
		setIsLoading(true)
		const res = await deleteFavorite({ id: product._id! })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}

		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success('Product removed from wishlist')
			setIsLoading(false)
		}
	}

	return (
		<div className='relative group rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden min-h-[220px] sm:min-h-[250px] flex flex-col'>
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
						className='cursor-pointer rounded-full bg-red-500 shadow-md hover:bg-red-400'
						disabled={isLoading}
						onClick={onDelete}
					>
						<Heart className='size-4 sm:size-4' />
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
		</div>
	)
}

export default WishlistCard

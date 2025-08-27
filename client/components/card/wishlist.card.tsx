'use client'

import { deleteFavorite } from '@/actions/user.actions'
import UseAction from '@/hooks/use-action'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
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
		<div className='relative flex flex-col'>
			<div className='bg-secondary relative group rounded-2xl shadow-md overflow-hidden'>
				<Image
					src={product.image!}
					width={300}
					height={300}
					className='mx-auto object-cover transition-transform duration-300 group-hover:scale-105'
					alt={product.title!}
				/>
				{/* Favorite button */}
				<div className='absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity'>
					<Button
						size='icon'
						className='cursor-pointer rounded-full bg-white shadow-md hover:bg-red-400 bg-red-500'
						disabled={isLoading}
						onClick={onDelete}
					>
						<Heart className='w-5 h-5 ' />
					</Button>
				</div>
			</div>

			{/* Title & Price */}
			<div className='flex justify-between items-center mt-3 text-sm'>
				<h1 className='font-semibold line-clamp-1'>{product.title}</h1>
				<p className='font-bold text-primary'>{formatPrice(product.price!)}</p>
			</div>
		</div>
	)
}

export default WishlistCard

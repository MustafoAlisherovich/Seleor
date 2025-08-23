'use client'

import { addFavorite } from '@/actions/user.actions'
import UseAction from '@/hooks/use-action'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface Props {
	product: IProduct
}

function ProductCard({ product }: Props) {
	const router = useRouter()
	const { isLoading, setIsLoading, onError } = UseAction()

	const onFavorite = async (e: MouseEvent) => {
		e.stopPropagation()
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

	return (
		<div
			onClick={() => router.push(`./product/${product._id}`)}
			className='cursor-pointer'
		>
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
						className='cursor-pointer rounded-full bg-white shadow-md hover:bg-gray-100'
						disabled={isLoading}
						onClick={onFavorite}
					>
						<Heart className='w-5 h-5 text-red-500' />
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

export default ProductCard

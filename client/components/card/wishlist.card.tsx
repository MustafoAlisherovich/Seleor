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
		<div className='group relative flex min-h-[260px] flex-col overflow-hidden rounded-lg border border-white/60 bg-white/75 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5'>
			<div className='relative flex h-44 w-full items-center justify-center bg-white sm:h-56 dark:bg-white/5'>
				<Link href={`/product/${product._id}`}>
					<Image
						src={product.image!}
						width={160}
						height={160}
						className='h-auto max-h-[140px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-[200px]'
						alt={product.title!}
					/>
				</Link>
				<div className='absolute right-2 top-2 z-10 transition-opacity sm:right-3 sm:top-3'>
					<Button
						size='icon'
						className='cursor-pointer bg-red-500 shadow-md hover:bg-red-400'
						disabled={isLoading}
						onClick={onDelete}
					>
						<Heart className='size-4 sm:size-4' />
					</Button>
				</div>
			</div>

			{/* Title & Price */}
			<Link href={`/product/${product._id}`}>
				<div className='mt-auto flex flex-col gap-1 px-3 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-2'>
					<h1 className='line-clamp-2 text-sm font-semibold sm:text-base'>
						{product.title}
					</h1>
					<p className='shrink-0 text-sm font-bold text-primary sm:text-lg'>
						{formatPrice(product.price!)}
					</p>
				</div>
			</Link>
		</div>
	)
}

export default WishlistCard

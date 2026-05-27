'use client'

import { deleteProduct } from '@/actions/admin.action'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import UseAction from '@/hooks/use-action'
import { useProduct } from '@/hooks/use-product'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import Image from 'next/image'
import { FC } from 'react'
import { toast } from 'sonner'

interface Props {
	product: IProduct
}
const ProductCard: FC<Props> = ({ product }) => {
	const { setOpen, setProduct } = useProduct()
	const { isLoading, setIsLoading, onError } = UseAction()

	const onEdit = () => {
		setOpen(true)
		setProduct(product)
	}

	async function onDelete() {
		setIsLoading(true)
		const res = await deleteProduct({ id: product._id })

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data?.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success('Product deleted successfully!')
			setIsLoading(false)
		}
	}

	return (
		<div className='relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-lg border border-white/60 bg-white/75 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5'>
			<div className='relative flex min-h-44 items-center justify-center bg-secondary/70 p-4'>
				<Image
					src={product.image!}
					width={200}
					height={200}
					className='mx-auto h-auto max-h-40 w-auto object-contain'
					alt={product.title!}
				/>
				<Badge className='absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate'>{product.category}</Badge>
			</div>

			<div className='p-3'>
				<div className='flex items-start justify-between gap-3 text-sm'>
					<h1 className='line-clamp-2 font-bold'>{product.title}</h1>
					<p className='shrink-0 font-medium text-primary'>{formatPrice(product.price!)}</p>
				</div>
				<p className='mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground'>{product.description}</p>
				<Separator className='my-2' />
			</div>

			<div className='grid grid-cols-2 gap-2 px-2 pb-2'>
				<Button variant={'secondary'} onClick={onEdit}>
					Edit
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant={'outline'}>Delete</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={onDelete} disabled={isLoading}>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	)
}

export default ProductCard

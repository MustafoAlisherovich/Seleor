import { getProduct } from '@/actions/user.actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { Params } from '@/types'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Props {
	params: Params
}

async function Page({ params }: Props) {
	const { productId } = await params

	const res = await getProduct({ id: productId })

	const product = res?.data?.product

	if (!product) return notFound()

	return (
		<div className='flex flex-col lg:flex-row items-start justify-center gap-12 py-28 mx-auto max-w-6xl'>
			{/* Image */}
			<div className='relative w-[350px] h-[500px] flex-shrink-0 bg-gradient-to-br from-secondary to-secondary/40 rounded-2xl shadow-lg overflow-hidden'>
				<Image
					src={product.image}
					fill
					className='object-contain p-6'
					alt={product.title}
				/>
			</div>

			{/* Info */}
			<div className='flex flex-col space-y-4 max-w-md'>
				<h1 className='font-bold text-4xl tracking-tight'>{product.title}</h1>
				<Badge className='w-fit' variant='secondary'>
					# {product.category}
				</Badge>

				<p className='text-sm text-muted-foreground leading-relaxed'>
					{product.description}
				</p>

				{/* Price */}
				<p className='text-3xl font-bold text-primary'>
					{formatPrice(+product.price)}
				</p>

				{/* Actions */}
				<div className='flex gap-4 pt-2'>
					<Button size='lg' className='cursor-pointer shadow-md'>
						Add to Cart
					</Button>
					<Button
						size='lg'
						variant='destructive'
						className='cursor-pointer shadow-md'
					>
						Buy Now
					</Button>
				</div>

				{/* Extra info */}
				<div className='text-xs text-muted-foreground space-y-1 pt-4 border-t'>
					<p>🚚 Free shipping on orders over $50</p>
					<p>🔒 Your purchase is secure. We use Payme for payments.</p>
					<p>↩️ 14-day return policy</p>
				</div>
			</div>
		</div>
	)
}

export default Page

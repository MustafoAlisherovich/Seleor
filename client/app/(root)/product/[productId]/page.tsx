import { getProduct } from '@/actions/user.actions'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Params } from '@/types'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './_components/product.cart'

interface Props {
	params: Params
}

export async function generateMetadata({ params }: Props) {
	const { productId } = await params
	const res = await getProduct({ id: productId })
	const product = res?.data?.product

	return {
		title: product?.title,
		description: product?.description,
		openGrap: { images: product?.image },
	}
}

async function Page({ params }: Props) {
	const { productId } = await params

	const res = await getProduct({ id: productId })

	const product = res?.data?.product

	if (!product) return null

	return (
		<div className='flex flex-col lg:flex-row items-start justify-center md:py-28 gap-12 mx-auto max-w-6xl'>
			<div className='relative w-full lg:w-[400px] h-[350px] bg-gradient-to-br from-secondary to-secondary/40 rounded-2xl shadow-lg overflow-hidden'>
				<Link
					href='/'
					className='md:hidden absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full shadow hover:bg-white transition'
				>
					<ArrowLeft className='h-5 w-5 text-gray-700' />
				</Link>

				<Image
					src={product.image}
					fill
					className='object-contain p-6'
					alt={product.title}
				/>
			</div>

			{/* Info */}
			<div className='flex flex-col space-y-4 max-w-md w-full'>
				<h1 className='font-bold text-4xl tracking-tight text-center lg:text-left'>
					{product.title}
				</h1>

				<div className='flex justify-center lg:justify-start'>
					<Badge className='w-fit' variant='secondary'>
						# {product.category}
					</Badge>
				</div>

				<p className='text-sm text-muted-foreground leading-relaxed text-center lg:text-left'>
					{product.description}
				</p>

				<p className='text-3xl font-bold text-primary text-center lg:text-left'>
					{formatPrice(+product.price)}
				</p>

				{/* Actions */}
				<div className='flex justify-center lg:justify-start'>
					<Cart product={product} />
				</div>

				{/* Extra info */}
				<div className='text-xs text-muted-foreground space-y-1 pt-4 border-t text-center lg:text-left'>
					<p>🚚 Free shipping on orders over $50</p>
					<p>🔒 Your purchase is secure. We use Payme for payments.</p>
					<p>↩️ 14-day return policy</p>
				</div>
			</div>
		</div>
	)
}

export default Page

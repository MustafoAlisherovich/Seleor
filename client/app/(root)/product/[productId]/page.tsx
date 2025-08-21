import { getProduct } from '@/actions/user.actions'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Params } from '@/types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import CreateOrderButton from '../_components/create-order.btn'

interface Props {
	params: Params
}

async function Page({ params }: Props) {
	const { productId } = await params

	const res = await getProduct({ id: productId })

	const product = res?.data?.product

	if (!product) return notFound()

	return (
		<div className='flex flex-col lg:flex-row items-center justify-center gap-8 py-24 mx-auto max-w-6xl'>
			{/* Image */}
			<div className='bg-secondary relative w-[350px] h-[500px] flex-shrink-0'>
				<Image
					src={product.image}
					fill
					className='object-contain'
					alt={product.title}
				/>
			</div>

			{/* Info */}
			<div className='flex flex-col space-y-2 max-w-md'>
				<h1 className='font-bold text-4xl'>{product.title}</h1>
				<Badge className='w-fit' variant={'secondary'}>
					# {product.category}
				</Badge>
				<p className='text-xs text-muted-foreground'>{product.description}</p>
				<p className='font-bold'>{formatPrice(+product.price)}</p>
				<CreateOrderButton />
				<div className='text-xs'>
					Your purchase is secure with us. We do not store any credit card
					information. We use Payme for payment processing.
				</div>
			</div>
		</div>
	)
}

export default Page

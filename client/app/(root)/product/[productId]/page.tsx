import { Badge } from '@/components/ui/badge'
import { products } from '@/constants'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import CreateOrderButton from '../_components/create-order.btn'

function Page() {
	return (
		<div className='flex flex-col lg:flex-row items-center justify-center gap-8 py-24 mx-auto max-w-6xl'>
			{/* Image */}
			<div className='bg-secondary relative w-[350px] h-[500px] flex-shrink-0'>
				<Image
					src={products[0].image}
					fill
					className='object-contain'
					alt={products[0].title}
				/>
			</div>

			{/* Info */}
			<div className='flex flex-col space-y-2 max-w-md'>
				<h1 className='font-bold text-4xl'>{products[0].title}</h1>
				<Badge className='w-fit' variant={'secondary'}>
					# {products[0].category}
				</Badge>
				<p className='text-xs text-muted-foreground'>
					{products[0].description}
				</p>
				<p className='font-bold'>{formatPrice(+products[0].price)}</p>
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

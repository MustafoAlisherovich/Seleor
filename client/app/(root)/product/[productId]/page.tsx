import { getProduct } from '@/actions/user.actions'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Params } from '@/types'
import { ArrowLeft, ShieldCheck, Sparkles, Truck } from 'lucide-react'
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
		<div className='container mx-auto max-w-7xl px-4 py-8 md:py-12'>
			<div className='premium-shell p-6 md:p-8 lg:p-10'>
				<div className='mb-6 flex items-center justify-between gap-4'>
					<Link href='/' className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'>
						<ArrowLeft className='h-4 w-4' /> Back to store
					</Link>
				</div>

				<div className='grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]'>
					<div className='relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-white to-secondary/70 p-6 shadow-[0_30px_90px_-45px_rgba(59,130,246,0.55)] dark:border-white/10 dark:from-white/5 dark:to-white/10'>
						<div className='relative h-[360px] md:h-[520px]'>
							<Image src={product.image} fill className='object-contain p-4' alt={product.title} />
						</div>
					</div>

					<div className='flex flex-col space-y-5'>
						<div className='space-y-4'>
							<Badge className='w-fit rounded-full bg-primary/10 px-4 py-1 text-primary hover:bg-primary/10' variant='secondary'>
								{product.category}
							</Badge>
							<h1 className='text-4xl font-black tracking-tight md:text-5xl'>{product.title}</h1>
							<p className='max-w-xl text-sm leading-7 text-muted-foreground md:text-base'>{product.description}</p>
						</div>

						<div className='rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5'>
							<div className='flex items-center justify-between gap-4'>
								<div>
									<p className='text-xs uppercase tracking-[0.24em] text-muted-foreground'>Price</p>
									<p className='mt-2 text-3xl font-black text-primary md:text-4xl'>{formatPrice(+product.price)}</p>
								</div>
							</div>
							<div className='mt-6'>
								<Cart product={product} />
							</div>
						</div>

						<div className='grid gap-3 sm:grid-cols-3'>
							<div className='rounded-2xl border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-white/5'>
								<Truck className='mb-2 size-5 text-primary' />
								<p className='text-sm font-semibold'>Fast shipping</p>
								<p className='mt-1 text-xs text-muted-foreground'>Free shipping on orders over $50.</p>
							</div>
							<div className='rounded-2xl border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-white/5'>
								<ShieldCheck className='mb-2 size-5 text-primary' />
								<p className='text-sm font-semibold'>Secure checkout</p>
								<p className='mt-1 text-xs text-muted-foreground'>Protected payments with trusted flow.</p>
							</div>
							<div className='rounded-2xl border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-white/5'>
								<Sparkles className='mb-2 size-5 text-primary' />
								<p className='text-sm font-semibold'>14-day returns</p>
								<p className='mt-1 text-xs text-muted-foreground'>Easy return policy for peace of mind.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page

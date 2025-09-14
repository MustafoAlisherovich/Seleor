import { getOrders } from '@/actions/user.actions'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import { SearchParams } from '@/types'
import { format } from 'date-fns'
import { Suspense } from 'react'

interface Props {
	searchParams: SearchParams
}

const Page = async (props: Props) => {
	const searchParams = await props.searchParams
	const res = await getOrders({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const orders = res?.data?.orders
	const isNext = res?.data?.isNext || false

	return (
		<>
			<div className='w-full space-y-3'>
				<h1 className='text-xl font-bold'>Orders</h1>
				<Suspense>
					<Filter showSearch />
				</Suspense>
			</div>

			<Separator className='my-3' />

			<div className='hidden md:block'>
				<Table className='text-sm'>
					{orders && orders.length > 0 && (
						<TableCaption>A list of your recent orders.</TableCaption>
					)}
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Order time</TableHead>
							<TableHead className='text-right'>Updated time</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders && orders.length === 0 && (
							<TableRow>
								<TableCell colSpan={5} className='text-center'>
									No orders found.
								</TableCell>
							</TableRow>
						)}
						{orders &&
							orders.map(order => (
								<TableRow key={order._id}>
									<TableCell>
										{order.products.map((item, i) => (
											<div key={i}>
												{item.product.title}{' '}
												<span className='text-primary'>x {item.quantity}</span>
											</div>
										))}
									</TableCell>
									<TableCell>
										<Badge>{order.status}</Badge>
									</TableCell>
									<TableCell>
										{formatPrice(
											order.products.reduce(
												(total, p) => total + p.product.price * p.quantity,
												0
											)
										)}
									</TableCell>
									<TableCell>
										{format(new Date(order.createdAt), 'dd-MMM yyyy')}
									</TableCell>
									<TableCell className='text-right'>
										{format(new Date(order.updatedAt), 'dd-MMM hh:mm a')}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>

			{/* Mobile cards */}
			<div className='space-y-3 md:hidden'>
				{orders && orders.length === 0 && (
					<p className='text-center text-sm text-muted-foreground'>
						No orders found.
					</p>
				)}
				{orders &&
					orders.map(order => (
						<div
							key={order._id}
							className='rounded-lg border p-3 space-y-2 bg-white shadow-sm'
						>
							<div className='flex justify-between'>
								<span className='font-medium'>Status:</span>
								<Badge>{order.status}</Badge>
							</div>
							<div>
								<span className='font-medium'>Products:</span>
								<div className='text-sm'>
									{order.products.map((item, i) => (
										<div key={i}>
											{item.product.title}{' '}
											<span className='text-primary'>x {item.quantity}</span>
										</div>
									))}
								</div>
							</div>
							<div className='flex justify-between text-sm'>
								<span className='font-medium'>Price:</span>
								<span>
									{formatPrice(
										order.products.reduce(
											(total, p) => total + p.product.price * p.quantity,
											0
										)
									)}
								</span>
							</div>
							<div className='flex justify-between text-xs text-muted-foreground'>
								<span>Ordered:</span>
								<span>{format(new Date(order.createdAt), 'dd-MMM yyyy')}</span>
							</div>
							<div className='flex justify-between text-xs text-muted-foreground'>
								<span>Updated:</span>
								<span>
									{format(new Date(order.updatedAt), 'dd-MMM hh:mm a')}
								</span>
							</div>
						</div>
					))}
			</div>

			<Pagination
				isNext={isNext}
				pageNumber={searchParams?.page ? +searchParams.page : 1}
			/>
		</>
	)
}

export default Page

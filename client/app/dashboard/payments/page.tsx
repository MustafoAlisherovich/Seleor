import { getTransactions } from '@/actions/user.actions'
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
import { formatPrice, getStatusText, getStatusVariant } from '@/lib/utils'
import { SearchParams } from '@/types'
import Image from 'next/image'
import { Suspense } from 'react'

interface Props {
	searchParams: SearchParams
}

const Page = async (props: Props) => {
	const searchParams = await props.searchParams
	const res = await getTransactions({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const transaction = res?.data?.transactions
	const isNext = res?.data?.isNext || false

	return (
		<>
			<div className='w-full space-y-3'>
				<h1 className='text-xl font-bold'>Payments</h1>
				<Suspense>
					<Filter />
				</Suspense>
			</div>

			<Separator className='my-3' />

			<div className='hidden overflow-x-auto md:block'>
				<Table className='text-sm'>
					{transaction && transaction.length > 0 && (
						<TableCaption>A list of your recent orders.</TableCaption>
					)}
					<TableHeader>
						<TableRow>
							<TableHead></TableHead>
							<TableHead>Product</TableHead>
							<TableHead>Provider</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className='text-right'>Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transaction && transaction.length === 0 && (
							<TableRow>
								<TableCell colSpan={5} className='text-center'>
									No orders found.
								</TableCell>
							</TableRow>
						)}
						{transaction &&
							transaction.map(transaction => (
								<TableRow key={transaction._id}>
									<TableCell>
										{transaction.products.map((item, i) => (
											<div key={i}>
												<Image
													src={item.image}
													alt={item.title}
													width={50}
													height={50}
												/>
											</div>
										))}
									</TableCell>
									<TableCell>
										{transaction.products.map((item, i) => (
											<div key={i}>
												{item.title}{' '}
												<span className='text-primary'>x {item.quantity}</span>
											</div>
										))}
									</TableCell>
									<TableCell>
										<Badge className='capitalize' variant='secondary'>
											{transaction.provider}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge variant={getStatusVariant(transaction.state)}>
											{getStatusText(transaction.state)}
										</Badge>
									</TableCell>
									<TableCell className='text-right'>
										{formatPrice(transaction.amount)}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>

			{/* Mobile view (cards) */}
			<div className='space-y-3 md:hidden'>
				{transaction && transaction.length === 0 && (
					<p className='text-center text-sm text-muted-foreground'>
						No payments found.
					</p>
				)}

				{transaction &&
					transaction.map(t => (
						<div
							key={t._id}
							className='space-y-2 rounded-lg border border-white/60 bg-white/75 p-3 shadow-sm dark:border-white/10 dark:bg-white/5'
						>
							{/* Provider + Status */}
							<div className='flex items-center justify-between'>
								<Badge className='capitalize' variant='secondary'>
									{t.provider}
								</Badge>
								<Badge variant={getStatusVariant(t.state)}>
									{getStatusText(t.state)}
								</Badge>
							</div>

							{/* Products */}
							<div>
								<span className='font-medium'>Products:</span>
								<div className='text-sm'>
									{t.products.map((item, i) => (
										<div key={i} className='flex items-center gap-2'>
											<Image
												src={item.image}
												alt={item.title}
												width={30}
												height={30}
												className='rounded'
											/>
											<span>
												{item.title}{' '}
												<span className='text-primary'>x {item.quantity}</span>
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Price */}
							<div className='flex justify-between text-sm'>
								<span className='font-medium'>Price:</span>
								<span>{formatPrice(t.amount)}</span>
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

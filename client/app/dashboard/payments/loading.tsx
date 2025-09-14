import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<>
			<div className='w-full space-y-3'>
				<h1 className='text-xl font-bold'>Orders</h1>
				<Filter showSearch />
			</div>

			<Separator className='my-3' />

			<div className='hidden md:block'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Provider</TableHead>
							<TableHead className='text-right'>Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell colSpan={5} className='text-center'>
								<div className='flex justify-center'>
									<Loader size={16} className='animate-spin' />
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>

			<div className='space-y-3 md:hidden'>
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className='rounded-lg border p-3 space-y-2 bg-white shadow-sm'
					>
						<div className='flex justify-between'>
							<Skeleton className='h-4 w-20' />
							<Skeleton className='h-5 w-16' />
						</div>

						<div className='space-y-1'>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-4 w-40' />
							<Skeleton className='h-4 w-32' />
						</div>

						<div className='flex justify-between'>
							<Skeleton className='h-4 w-16' />
							<Skeleton className='h-4 w-20' />
						</div>

						<div className='flex justify-between text-xs'>
							<Skeleton className='h-3 w-24' />
							<Skeleton className='h-3 w-16' />
						</div>

						<div className='flex justify-between text-xs'>
							<Skeleton className='h-3 w-24' />
							<Skeleton className='h-3 w-16' />
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default Loading

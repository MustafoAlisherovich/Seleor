import { getStatistics } from '@/actions/user.actions'
import { Separator } from '@/components/ui/separator'
import { authOptions } from '@/lib/auth-options'
import { Banknote, Heart, Shuffle } from 'lucide-react'
import { getServerSession } from 'next-auth'
import EditInformation from '../_components/edit-information'

const Page = async () => {
	const session = await getServerSession(authOptions)
	const res = await getStatistics()

	const statistics = res?.data?.statistics

	return (
		<>
			<h1 className='text-xl font-semibold'>Personal information</h1>
			<Separator className='my-3' />
			<EditInformation
				user={JSON.parse(JSON.stringify(session?.currentUser))}
			/>

			<div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4'>
				<div className='flex min-h-36 cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-white/60 bg-white/70 p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5'>
					<Shuffle className='size-9 text-primary sm:size-11' />
					<div className='text-center'>
						<h1 className='text-3xl font-bold sm:text-4xl'>{statistics?.totalOrders}</h1>
						<p className='text-sm text-muted-foreground'>Orders</p>
					</div>
				</div>

				<div className='flex min-h-36 cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-white/60 bg-white/70 p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5'>
					<Banknote className='size-9 text-primary sm:size-11' />
					<div className='text-center'>
						<h1 className='text-3xl font-bold sm:text-4xl'>
							{statistics?.totalTransactions}
						</h1>
						<p className='text-sm text-muted-foreground'>Payments</p>
					</div>
				</div>

				<div className='flex min-h-36 cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-white/60 bg-white/70 p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5'>
					<Heart className='size-9 text-primary sm:size-11' />
					<div className='text-center'>
						<h1 className='text-3xl font-bold sm:text-4xl'>
							{statistics?.totalFavourites}
						</h1>
						<p className='text-sm text-muted-foreground'>Wishlist</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page

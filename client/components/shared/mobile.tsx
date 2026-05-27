'use client'

import { useCart } from '@/hooks/use-cart'
import { Heart, Menu, ShoppingCart, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import Logo from './logo'
import UserBox from './user-box'

function Mobile() {
	const { cartsLength } = useCart()
	const { data: session } = useSession()

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='border-white/60 bg-white/80'
				>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetTitle />

			<SheetContent
				side='top'
				className='border-none bg-transparent p-3 shadow-none sm:p-4'
			>
				<div className='premium-shell space-y-5 p-4 sm:p-5'>
					<div className='flex items-center justify-between'>
						<Logo />
					</div>
					<div className='grid grid-cols-3 gap-3'>
						<Link href='/dashboard/wishlist'>
							<Button variant='secondary' className='w-full'>
								<Heart className='size-5' />
							</Button>
						</Link>

						<Link href='/shopping/cart'>
							<Button variant='secondary' className='relative w-full'>
								<ShoppingCart className='size-5' />
								{cartsLength() > 0 && (
									<div className='absolute right-2 top-2 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white'>
										{cartsLength()}
									</div>
								)}
							</Button>
						</Link>

						{!session?.currentUser?._id ? (
							<Link href='/sign-in'>
								<Button variant='secondary' className='w-full'>
									<User className='size-5' />
								</Button>
							</Link>
						) : (
							<div className='flex items-center justify-center'>
								<UserBox user={session.currentUser} />
							</div>
						)}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default Mobile

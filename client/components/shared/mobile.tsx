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
				<Button variant={'ghost'} size={'icon'}>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetTitle></SheetTitle>

			<SheetContent side='top'>
				<div className='flex flex-col items-center space-y-3'>
					<Logo />

					<div className='flex justify-center items-center space-x-6'>
						<Link href='/dashboard/wishlist'>
							<Button variant='ghost' size='icon'>
								<Heart className='size-6' />
							</Button>
						</Link>

						<Link href='/shopping/cart'>
							<Button variant='ghost' size='icon' className='relative'>
								<ShoppingCart className='size-6' />
								{cartsLength() > 0 && (
									<div className='absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-destructive text-white text-xs'>
										{cartsLength()}
									</div>
								)}
							</Button>
						</Link>

						{!session?.currentUser?._id ? (
							<Link href='/sign-in'>
								<Button variant='ghost' size='icon'>
									<User className='size-6' />
								</Button>
							</Link>
						) : (
							<UserBox user={session.currentUser} />
						)}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default Mobile

'use client'

import { useCart } from '@/hooks/use-cart'
import { Heart, ShoppingCart, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../ui/button'
import GlobalSearch from './global-search'
import Logo from './logo'
import UserBox from './user-box'

function Navbar() {
	const { data: session } = useSession()
	const { cartsLength } = useCart()

	return (
		<nav className='fixed w-full z-50 bg-secondary top-0 '>
			<div className='container max-w-7xl mx-auto px-4'>
				<div className='flex items-center justify-between h-16'>
					{/* Chap taraf - Logo */}
					<Logo />

					{/* O'rtada - Search */}
					<div className='flex-1 flex justify-center'>
						<GlobalSearch />
					</div>

					{/* O'ng taraf - Iconlar */}
					<div className='flex items-center space-x-4'>
						<Link href='/dashboard/wishlist'>
							<Button
								variant='ghost'
								className='flex items-center gap-2 px-3 py-2 cursor-pointer'
							>
								<Heart className='size-5' />
								<span className='hidden sm:inline'>Wishlist</span>
							</Button>
						</Link>

						<Button
							variant='ghost'
							className=' relative flex items-center gap-2 px-3 py-2 cursor-pointer'
						>
							<Link href={'/shopping/cart'}>
								<ShoppingCart className='size-6' />
								{cartsLength() ? (
									<div className='absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-destructive text-white'>
										{cartsLength()}
									</div>
								) : null}
							</Link>
							{cartsLength() === 0 && (
								<span className='hidden sm:inline'>Cart</span>
							)}
						</Button>

						{!session?.currentUser?._id && (
							<Link href='/sign-in'>
								<Button
									variant='ghost'
									className='flex items-center gap-2 px-3 py-2 cursor-pointer'
								>
									<User className='size-7' />
									<span className='hidden sm:inline'>Login</span>
								</Button>
							</Link>
						)}

						{session?.currentUser?._id && (
							<UserBox user={session.currentUser} />
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar

'use client'

import { useCart } from '@/hooks/use-cart'
import { Heart, ShoppingCart, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../ui/button'
import GlobalSearch from './global-search'
import Logo from './logo'
import Mobile from './mobile'
import UserBox from './user-box'

function Navbar() {
	const { data: session } = useSession()
	const { cartsLength } = useCart()

	return (
		<nav className='sticky top-0 z-50 border-b border-white/50 bg-background/70 backdrop-blur-2xl dark:border-white/10'>
			<div className='container mx-auto max-w-7xl px-4 py-3'>
				<div className='premium-shell flex items-center justify-between gap-3 px-4 py-3 md:px-6'>
					<div className='hidden shrink-0 md:block'>
						<Logo />
					</div>

					<div className='flex min-w-0 flex-1 justify-center'>
						<GlobalSearch />
					</div>

					<div className='hidden items-center gap-2 md:flex'>
						<Link href='/dashboard/wishlist'>
							<Button variant='ghost' className='gap-2 px-4'>
								<Heart className='size-4.5' />
								<span>Wishlist</span>
							</Button>
						</Link>

						<Link href='/shopping/cart'>
							<Button variant='ghost' className='relative gap-2 px-4'>
								<ShoppingCart className='size-5' />
								<span>Cart</span>
								{cartsLength() > 0 && (
									<div className='absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white shadow-lg'>
										{cartsLength()}
									</div>
								)}
							</Button>
						</Link>

						{!session?.currentUser?._id ? (
							<Link href='/sign-in'>
								<Button variant='outline' className='gap-2 px-4'>
									<User className='size-4.5' />
									<span>Login</span>
								</Button>
							</Link>
						) : (
							<UserBox user={session.currentUser} />
						)}
					</div>

					<div className='md:hidden'>
						<Mobile />
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar

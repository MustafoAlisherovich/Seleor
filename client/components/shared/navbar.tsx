'use client'

import { Heart, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import GlobalSearch from './global-search'
import Logo from './logo'

function Navbar() {
	return (
		<nav className='fixed w-full z-50 bg-secondary'>
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

						<Link href='/sign-in'>
							<Button
								variant='ghost'
								className='flex items-center gap-2 px-3 py-2 cursor-pointer'
							>
								<User className='size-5' />
								<span className='hidden sm:inline'>Login</span>
							</Button>
						</Link>

						<Button
							variant='ghost'
							className='flex items-center gap-2 px-3 py-2 cursor-pointer'
						>
							<ShoppingCart className='size-5' />
							<span className='hidden sm:inline'>Cart</span>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar

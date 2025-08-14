'use client'

import { Heart, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import GlobalSearch from './global-search'
import Logo from './logo'

function Navbar() {
	return (
		<div className='w-full bg-secondary border-b fixed top-0 left-0 z-50'>
			<div className='container max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center h-auto sm:h-20 gap-3 p-4'>
				{/* Logo */}
				<div className='flex justify-center sm:justify-start'>
					<Logo />
				</div>

				{/* Search */}
				<div className=' flex justify-center order-3 sm:order-none w-full sm:w-1/2'>
					<GlobalSearch />
				</div>

				{/* Icons */}
				<div className='flex justify-center sm:justify-end gap-5'>
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
	)
}

export default Navbar

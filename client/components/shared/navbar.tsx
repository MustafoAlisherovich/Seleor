import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Logo from './logo'

function Navbar() {
	return (
		<div className='h-20 bg-secondary border-b fixed inset-0 z-50'>
			<div className='container max-w-6xl flex items-center justify-between h-full'>
				<Logo />

				<div className='flex items-center gap-2'>
					<Link href={'/sign-in'}>
						<Avatar>
							<AvatarImage />
							<AvatarFallback className='bg-primary text-white'>
								M
							</AvatarFallback>
						</Avatar>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar

'use client'

import { IUser } from '@/types'
import { LogIn } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface Props {
	user: IUser
}
const UserBox: FC<Props> = ({ user }) => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className='cursor-pointer size-10'>
						<AvatarImage src={user.avatar} alt={user.fullName} />
						<AvatarFallback className='capitalize bg-primary text-white'>
							{user.fullName.charAt(0)}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{user.role === 'admin' && (
						<DropdownMenuItem className='cursor-pointer' asChild>
							<Link href={'/admin'}>Admin</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className='cursor-pointer' asChild>
						<Link href={'/dashboard'}>Dashboard</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={() => signOut({ callbackUrl: '/sign-in' })}
					>
						<LogIn />
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default UserBox

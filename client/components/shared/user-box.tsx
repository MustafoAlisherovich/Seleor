'use client'

import { IUser } from '@/types'
import { LayoutDashboard, LogIn, Shield } from 'lucide-react'
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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='size-10 cursor-pointer rounded-2xl border border-white/50 shadow-sm'>
					<AvatarImage src={user.avatar} alt={user.fullName} />
					<AvatarFallback className='capitalize bg-primary text-white'>
						{user.fullName.charAt(0)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-60 rounded-2xl border-white/50 bg-white/85 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90'>
				<DropdownMenuLabel className='pb-1'>
					<div className='flex flex-col'>
						<span className='font-semibold'>{user.fullName}</span>
						<span className='text-xs font-normal text-muted-foreground'>{user.email}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{user.role === 'admin' && (
					<DropdownMenuItem className='cursor-pointer rounded-xl' asChild>
						<Link href='/admin' className='flex items-center gap-2'>
							<Shield className='size-4' />
							Admin
						</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuItem className='cursor-pointer rounded-xl' asChild>
					<Link href='/dashboard' className='flex items-center gap-2'>
						<LayoutDashboard className='size-4' />
						Dashboard
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					className='cursor-pointer rounded-xl text-red-500 focus:text-red-500'
					onClick={() => signOut({ callbackUrl: '/sign-in' })}
				>
					<LogIn />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserBox

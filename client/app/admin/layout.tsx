import { authOptions } from '@/lib/auth-options'
import { ChildProps } from '@/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Sidebar from './_components/sidebat'

async function Layout({ children }: ChildProps) {
	const session = await getServerSession(authOptions)
	if (!session) return redirect('/sign-in')
	if (session.currentUser?.role !== 'admin') return redirect('/')

	return (
		<>
			<Sidebar />
			<main className='w-full p-4 pl-[320px] pt-7'>
				<div className='size-full rounded-md px-4 pb-4'>{children}</div>
			</main>
		</>
	)
}

export default Layout

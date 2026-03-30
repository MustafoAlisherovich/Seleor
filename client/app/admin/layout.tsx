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
			<main className='w-full px-4 py-6 md:pl-[310px]'>
				<div className='premium-shell min-h-[calc(100vh-150px)] p-6 md:p-8'>{children}</div>
			</main>
		</>
	)
}

export default Layout

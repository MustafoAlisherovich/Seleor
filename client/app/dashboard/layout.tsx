import { authOptions } from '@/lib/auth-options'
import { ChildProps } from '@/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Sidebar from './_components/sidebar'

async function Layout({ children }: ChildProps) {
	const session = await getServerSession(authOptions)
	if (!session) return redirect('/sign-in')

	return (
		<>
			<Sidebar />
			<main className='w-full px-3 py-4 sm:px-4 md:py-6 md:pl-[310px]'>
				<div className='premium-shell min-h-[calc(100vh-150px)] p-4 sm:p-6 md:p-8'>{children}</div>
			</main>
		</>
	)
}

export default Layout

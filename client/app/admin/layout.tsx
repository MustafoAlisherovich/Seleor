import { ChildProps } from '@/types'
import Sidebar from './_components/sidebat'

function Layout({ children }: ChildProps) {
	return (
		<>
			<Sidebar />
			<main className='w-full p-4 pl-[320px] pt-[15vh]'>
				<div className='size-full rounded-md px-4 pb-4 shadow-md'>
					{children}
				</div>
			</main>
		</>
	)
}

export default Layout

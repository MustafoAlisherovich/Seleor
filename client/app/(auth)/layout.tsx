import { ChildProps } from '@/types'

function Layout({ children }: ChildProps) {
	return <section className='flex justify-center mt-44'>{children}</section>
}

export default Layout

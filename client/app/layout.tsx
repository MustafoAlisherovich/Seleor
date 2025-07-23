import Navbar from '@/components/shared/navbar'
import { Toaster } from '@/components/ui/sonner'
import { ChildProps } from '@/types'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
	weight: ['400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Seleor e-commerce',
	description: 'Seleor e-commerce build with nextJS',
	icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }: ChildProps) {
	return (
		<html lang='en'>
			<body className={`${montserrat.className} antialiased`}>
				<Navbar />
				<main className='container max-6xl mt-24'>{children}</main>
				<Toaster />
			</body>
		</html>
	)
}

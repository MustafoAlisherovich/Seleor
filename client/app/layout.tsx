import Navbar from '@/components/shared/navbar'
import { Toaster } from '@/components/ui/sonner'
import { ChildProps } from '@/types'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
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
				<NextTopLoader
					color='#007aff'
					initialPosition={0.5}
					crawlSpeed={200}
					height={3}
					crawl={true}
					showSpinner={false}
					easing='ease'
					speed={200}
					shadow='0 0 10px #007aff,0 0 5px #007aff'
				/>
				<main className=''>{children}</main>
				<Toaster />
			</body>
		</html>
	)
}

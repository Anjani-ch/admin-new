import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import AsideNav from './_components/AsideNav'
import Header from './_components/Header'

const inter = Inter({
	display: 'swap',
	preload: true,
	subsets: ['latin'],
	weight: ['300', '400', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Flyttefordel Admin',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='no'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					inter.className
				)}
			>
				<div className='flex min-h-screen w-full flex-col bg-muted/40'>
					<AsideNav />
					<Header />

					<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
						{children}
					</div>
				</div>
			</body>
		</html>
	)
}

import Link from 'next/link'
import { Home, PanelLeft, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function Header() {
	return (
		<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						size='icon'
						variant='outline'
						className='sm:hidden'
					>
						<PanelLeft className='h-5 w-5' />
						<span className='sr-only'>Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent
					side='left'
					className='sm:max-w-xs'
				>
					<nav className='grid gap-6 text-lg font-medium'>
						<Link
							href='/'
							className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
						>
							<Home className='h-5 w-5' />
							Forside
						</Link>
						<Link
							href='/flyttefordel'
							className='flex items-center gap-4 px-2.5 text-foreground'
						>
							<Truck className='h-5 w-5' />
							Flyttefordel
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	)
}

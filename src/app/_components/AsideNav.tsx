import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Home, Truck } from 'lucide-react'
import Link from 'next/link'

export default function AsideNav() {
	return (
		<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
			<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='/'
								className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
							>
								<Home className='h-5 w-5' />
								<span className='sr-only'>Forside</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Forside</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='/flyttefordel'
								className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
							>
								<Truck className='h-5 w-5' />
								<span className='sr-only'>Flyttefordel</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Flyttefordel</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
			{/* <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='#'
								className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
							>
								<Settings className='h-5 w-5' />
								<span className='sr-only'>Settings</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Settings</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav> */}
		</aside>
	)
}

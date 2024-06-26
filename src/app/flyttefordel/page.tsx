import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getPages } from '@/data-access/page'
import { getPagesUseCase } from '@/use-cases/page'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import CreatePageFormDialog from './_components/CreatePageFormDialog'
import { getContainersUseCase } from '@/use-cases/container'
import { getContainers } from '@/data-access/container'
import DeletePageButton from './_components/DeletePageButton'
import { env } from 'next-runtime-env'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

export default async function page() {
	const pages = await getPagesUseCase(
		{ getPages },
		{ endpointId: parseInt(env('FLYTTEFORDEL_FLYTTEFORDEL_ENDPOINT_ID')!) }
	)

	// We need to fetch all containers and later filter out ones that do not
	// belong to specific pages
	const containers = await getContainersUseCase({ getContainers })

	return (
		<>
			<Breadcrumb className='hidden md:flex mb-5'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/flyttefordel'>Flyttefordel</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Card>
				<CardHeader className='px-7'>
					<CardTitle>Sider</CardTitle>
					<CardDescription>Sider i flyttefordel løpet</CardDescription>
				</CardHeader>
				<CardContent>
					<CreatePageFormDialog
						endpointId={parseInt(env('FLYTTEFORDEL_FLYTTEFORDEL_ENDPOINT_ID')!)}
					/>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Navn</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>
									<span className='sr-only'>Handlinger</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{pages.map(page => {
								// There is a business rule in backend API that you cannot delete page without deleting
								// all connected containers first
								const canDelete =
									containers.filter(
										container => container.pageId === page.pageId
									).length === 0

								return (
									<TableRow
										key={page.pageId}
										className='bg-accent'
									>
										<TableCell className='font-medium'>
											<Link href={`/flyttefordel/${page.pageId}`}>
												{page.name}
											</Link>
										</TableCell>
										<TableCell>
											<Badge
												className='text-xs'
												variant={page.active ? 'default' : 'secondary'}
											>
												{page.active ? 'Aktiv' : 'Inaktiv'}
											</Badge>
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup='true'
														size={'icon'}
														variant={'ghost'}
													>
														<MoreHorizontal className='h-4 w-4' />
														<span className='sr-only'>Bruke meny</span>
													</Button>
												</DropdownMenuTrigger>

												<DropdownMenuContent align='end'>
													<DropdownMenuLabel>Handlinger</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DeletePageButton
														pageName={page.name!}
														pageId={page.pageId!}
														disabled={!canDelete}
													/>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	)
}

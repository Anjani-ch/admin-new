import { getPageById } from '@/data-access/page'
import { getPageByIdUseCase } from '@/use-cases/page'
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
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import CreateContainerFormDialog from './_components/CreateContainerFormDialog'
import DeleteContainerButton from './_components/DeleteContainerButton'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
	params: {
		pageId: string
	}
}

export default async function Page({ params: { pageId } }: Props) {
	const page = await getPageByIdUseCase({ getPageById }, { pageId })

	return (
		<>
			<Breadcrumb className='hidden md:flex mb-5'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/flyttefordel'>Flyttefordel</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbLink href={`/flyttefordel/${page.pageId}`}>
							{page.name}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Card>
				<CardHeader className='px-7'>
					<CardTitle>Containers</CardTitle>
					<CardDescription>Containers for side: {page.name}</CardDescription>
				</CardHeader>
				<CardContent>
					<CreateContainerFormDialog pageId={pageId} />

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
							{page.containers
								?.sort((a, b) => a.sortOrder! - b.sortOrder!)
								.map(container => {
									// There is a business rule in backend API that you cannot delete container without deleting
									// all connected templates first
									const canDelete = (container.templates || []).length === 0

									return (
										<TableRow
											key={container.containerId}
											className='bg-accent'
										>
											<TableCell className='font-medium'>
												<Link
													href={`/flyttefordel/${pageId}/${container.containerId}`}
												>
													{container.name}
												</Link>
											</TableCell>
											<TableCell>
												<Badge
													className='text-xs'
													variant={container.active ? 'default' : 'secondary'}
												>
													{container.active ? 'Aktiv' : 'Inaktiv'}
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
														<DeleteContainerButton
															containerName={container.name!}
															containerId={container.containerId!}
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

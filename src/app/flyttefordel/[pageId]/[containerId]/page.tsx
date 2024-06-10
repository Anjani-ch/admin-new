import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
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
import { getContainerById } from '@/data-access/container'
import { getPageById } from '@/data-access/page'
import { getContainerByIdUseCase } from '@/use-cases/container'
import { getPageByIdUseCase } from '@/use-cases/page'
import Link from 'next/link'
import CreateTemplateFormDialog from './_components/CreateTemplateFormDialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import DeleteTemplateButton from './_components/DeleteTemplateButton'

type Props = {
	params: {
		containerId: string
	}
}

export default async function Page({ params: { containerId } }: Props) {
	const container = await getContainerByIdUseCase(
		{ getContainerById },
		{ containerId }
	)
	const page = await getPageByIdUseCase(
		{ getPageById },
		{ pageId: container.pageId! }
	)

	return (
		<>
			<Breadcrumb className='hidden md:flex mb-5'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href='/flyttefordel'>Flyttefordel</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbLink href={`/flyttefordel/${page.pageId}`}>
							{page.name}
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink
							href={`/flyttefordel/${page.pageId}/${container.containerId}`}
						>
							{container.name}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Card>
				<CardHeader className='px-7'>
					<CardTitle>Annonser</CardTitle>
					<CardDescription>
						Annonser for container: {container.name}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CreateTemplateFormDialog
						pageId={page.pageId}
						containerId={containerId}
					/>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Navn</TableHead>
								<TableHead>Produkter</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Gyldig til</TableHead>
								<TableHead>
									<span className='sr-only'>Handlinger</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{container.templates
								?.sort((a, b) => a.sortOrder! - b.sortOrder!)
								.map(template => {
									const validToDate = new Date(template.validToDate!)

									// There is a business rule in backend API that you cannot delete template without deleting
									// all connected template offers first
									const canDelete = (template.offers || []).length === 0

									return (
										<TableRow
											key={template.templateId}
											className='bg-accent'
										>
											<TableCell className='font-medium'>
												<Link
													href={`/flyttefordel/${page.pageId}/${container.containerId}/${template.templateId}`}
												>
													{template.name}
												</Link>
											</TableCell>
											<TableCell>
												{template.offers?.map(offer =>
													offer.product ? (
														<div
															key={offer.templateOfferId}
														>{`${offer.product.name} - ID: ${offer.product.productId}`}</div>
													) : null
												)}
											</TableCell>
											<TableCell>
												<Badge
													className='text-xs'
													variant={template.active ? 'default' : 'secondary'}
												>
													{template.active ? 'Aktiv' : 'Inaktiv'}
												</Badge>
											</TableCell>
											<TableCell>
												{validToDate.getFullYear() !== 9999
													? new Intl.DateTimeFormat('nb-NO', {
															day: '2-digit',
															month: '2-digit',
															year: '2-digit',
													  }).format(validToDate)
													: 'Uten utløp'}
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
														<DeleteTemplateButton
															containerId={containerId}
															pageId={container.pageId!}
															templateId={template.templateId!}
															templateName={template.name!}
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

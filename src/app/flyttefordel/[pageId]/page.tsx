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
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import CreateContainerFormDialog from './_components/CreateContainerFormDialog'

type Props = {
	params: {
		pageId: string
	}
}

export default async function Page({ params: { pageId } }: Props) {
	const page = await getPageByIdUseCase({ getPageById }, { pageId })

	const highestSortOrder = page.containers
		?.map(page => page.sortOrder!)
		?.sort((a, b) => b - a)[0]

	return (
		<Card>
			<CardHeader className='px-7'>
				<CardTitle>Containers</CardTitle>
				<CardDescription>Containers for side: {page.name}</CardDescription>
			</CardHeader>
			<CardContent>
				<CreateContainerFormDialog
					pageId={pageId}
					sortOrder={highestSortOrder ? highestSortOrder + 1 : 0}
				/>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Navn</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{page.containers
							?.sort((a, b) => a.sortOrder! - b.sortOrder!)
							.map(container => {
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
									</TableRow>
								)
							})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

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
import { getPages } from '@/data-access/page'
import { getPagesUseCase } from '@/use-cases/page'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import CreatePageFormDialog from './_components/CreatePageFormDialog'

export default async function page() {
	const pages = await getPagesUseCase({ getPages })

	return (
		<Card>
			<CardHeader className='px-7'>
				<CardTitle>Sider</CardTitle>
				<CardDescription>Sider i flyttefordel løpet</CardDescription>
			</CardHeader>
			<CardContent>
				<CreatePageFormDialog />

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Navn</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pages
							.sort((a, b) => a.sortOrder! - b.sortOrder!)
							.map(page => (
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
								</TableRow>
							))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

import { getTemplates } from '@/data-access/template'
import { getTemplatesUseCase } from '@/use-cases/template'
import { Badge } from '@/components/ui/badge'
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
import { take } from 'lodash'
import Link from 'next/link'
import { getContainersUseCase } from '@/use-cases/container'
import { getContainers } from '@/data-access/container'

export default async function RecentlyChangedTemplates() {
	const templates = await getTemplatesUseCase({ getTemplates })
	const containers = await getContainersUseCase({ getContainers })

	return (
		<Card>
			<CardHeader>
				<CardTitle>Annonser</CardTitle>
				<CardDescription>Sist endret annonser</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Template</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className='hidden md:table-cell'>
								Sist endret
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{take(templates, 5).map(template => (
							<TableRow
								key={template.templateId}
								className='bg-accent'
							>
								<TableCell className='font-medium'>
									<Link
										href={`/flyttefordel/${
											containers.find(
												container =>
													container.containerId === template.containerId
											)!.pageId
										}/${template.containerId}/${template.templateId}`}
									>
										{template.name}
									</Link>
								</TableCell>
								<TableCell>
									<Badge
										className='text-xs'
										variant={template.active ? 'default' : 'secondary'}
									>
										{template.active ? 'Aktiv' : 'Inaktiv'}
									</Badge>
								</TableCell>
								<TableCell className='hidden md:table-cell'>
									{new Intl.DateTimeFormat('nb-NO', {
										day: '2-digit',
										month: '2-digit',
										year: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
									}).format(new Date(template.changedDate!))}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

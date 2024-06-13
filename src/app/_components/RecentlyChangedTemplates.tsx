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

export default async function RecentlyChangedTemplates() {
	let templates = await getTemplatesUseCase({ getTemplates })

	templates = take(templates, 5)

	return (
		<Card>
			<CardHeader className='px-7'>
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
						{templates.map(template => (
							<TableRow
								key={template.templateId}
								className='bg-accent'
							>
								<TableCell className='font-medium'>{template.name}</TableCell>
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

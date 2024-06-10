'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { templateTypes } from '@/constants/template'
import { GetTemplateByKeyVm, TemplateType } from '@/types/api/template'
import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'

type Props = {
	template: GetTemplateByKeyVm
}

export default function TemplateEditor({ template }: Props) {
	const form = useForm()

	return (
		<div className='grid grid-cols-4 gap-8 max-w-7xl mx-auto'>
			<div className='col-span-3'>
				<Card className='mb-8'>
					<CardContent className='py-4 flex gap-4 items-center justify-between'>
						<Badge>{templateTypes[TemplateType.Offer]}</Badge>
						<Input value={template.name} />
						<Switch />
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='mb-4'>
						<CardTitle className='mb-3'>Logo</CardTitle>
						<CardDescription>
							Bilde som vil vise på annonsen på flyttefordel
						</CardDescription>
					</CardHeader>

					<CardContent>
						<img
							src={template.logo!}
							alt='template logo'
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Innhold</CardTitle>
					</CardHeader>
					<CardContent>
						<Label>Overskrift</Label>
						<Input value={template.header} />

						<Label>Tekst</Label>
						<Textarea
							value={template.text}
							rows={10}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Tilbud</CardTitle>
						<CardDescription>
							Tilbud knyttet til annonse. Dette er det kunden kan bestille.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead className='max-w-32'>Tekst</TableHead>
									<TableHead>Produkt ID</TableHead>
									<TableHead>Produkt</TableHead>
									<TableHead>Pris</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{template.offers?.map(offer => (
									<TableRow key={offer.templateOfferId}>
										<TableCell>{offer.name}</TableCell>
										<TableCell>{offer.text}</TableCell>
										<TableCell>{offer.productId}</TableCell>
										<TableCell>{offer.product?.name}</TableCell>
										<TableCell>{offer.price}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>

					<CardFooter className='justify-center border-t p-4'>
						<Button
							size='sm'
							variant='ghost'
							className='gap-1'
						>
							<PlusCircle className='h-3.5 w-3.5' />
							Legg til tilbud
						</Button>
					</CardFooter>
				</Card>
			</div>

			<Card>
				<CardContent></CardContent>
			</Card>
		</div>
	)
}

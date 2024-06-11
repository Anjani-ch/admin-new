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
import FileUpload from './FileUpload'
import { DatePicker } from '@/components/form-control/DatePicker'

type Props = {
	template: GetTemplateByKeyVm
}

export default function TemplateEditor({ template }: Props) {
	const form = useForm()

	return (
		<div>
			<div className='grid grid-cols-4 gap-8 max-w-7xl mx-auto'>
				<div className='col-span-3'>
					<Card className='mb-8'>
						<CardContent className='py-4 flex gap-4 items-center justify-between'>
							<Badge>{templateTypes[TemplateType.Offer]}</Badge>
							<Input defaultValue={template.name} />
							<Switch />
						</CardContent>
					</Card>

					<Card className='mb-8'>
						<CardHeader className='mb-4'>
							<CardTitle className='mb-3'>Logo</CardTitle>
							<CardDescription>
								Bilde som vil vise på annonsen på flyttefordel
							</CardDescription>
						</CardHeader>

						<CardContent>
							<FileUpload
								imageUrl={template.logo}
								onFileSelect={({ file, dataUrl }) => {}}
							/>
						</CardContent>
					</Card>

					<Card className='mb-8'>
						<CardHeader>
							<CardTitle>Innhold</CardTitle>
						</CardHeader>
						<CardContent>
							<Label>Overskrift</Label>
							<Input
								className='mb-4'
								defaultValue={template.header}
							/>

							<Label>Tekst</Label>
							<Textarea
								defaultValue={template.text}
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
					<CardContent>
						<div className='my-4'>
							<Label className='block mb-3'>Gyldig til</Label>

							<DatePicker
								value={
									template.validToDate
										? new Date(template.validToDate)
										: new Date()
								}
								onChange={() => {}}
								disabled={date =>
									date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
								}
							/>
						</div>

						<div>
							<Label className='block mb-3'>Uten utløp</Label>

							<Switch
								checked={
									!!template.validToDate &&
									new Date(template.validToDate).getFullYear() !== 9999
								}
								onCheckedChange={() => {}}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

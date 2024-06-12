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
import {
	SubmitHandler,
	useFieldArray,
	useForm,
	useWatch,
} from 'react-hook-form'
import FileUpload from './FileUpload'
import { DatePicker } from '@/components/form-control/DatePicker'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { useCallback } from 'react'
import Combobox from '@/components/form-control/Combobox'
import { bytesToMb } from '@/lib/utils'
import { updateTemplateAction } from '../_actions/updateTemplateAction'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

type Props = {
	pageId: string
	template: GetTemplateByKeyVm
	products: {
		name: string
		productId: string
	}[]
}

type FormSchema = z.infer<typeof formSchema>

const formSchema = z.object({
	noExpiry: z.boolean(),
	name: z.string().trim().min(1),
	active: z.boolean(),
	header: z.string().trim().min(1),
	text: z.string().trim().min(1).max(256),
	logo: z
		.object({
			name: z.string().min(1),
			url: z.string().min(1),
		})
		.or(z.string()),
	validToDate: z.date(),
	terms: z.string(),
	offers: z.array(
		z.object({
			name: z.string().trim().min(1),
			sortOrder: z.number(),
			text: z.string().trim().min(1),
			price: z.number(),
			product: z.object({
				name: z.string().trim().min(1),
				productId: z.string(),
			}),
		})
	),
})

export default function TemplateEditor({ template, products, pageId }: Props) {
	const form = useForm<FormSchema>({
		mode: 'all',
		resolver: zodResolver(formSchema),
		defaultValues: {
			noExpiry: new Date(template.validToDate!).getFullYear() === 9999,
			...template,
			name: template.name || '',
			header: template.header || '',
			text: template.text || '',
			logo: template.logo || {
				name: '',
				url: '',
			},
			validToDate: new Date(template.validToDate!),
			terms: '',
		},
	})

	const templateOffersFieldArray = useFieldArray({
		control: form.control,
		name: 'offers',
	})

	const noExpiryWatch = useWatch({
		control: form.control,
		name: 'noExpiry',
	})

	const templateLogoWatch = useWatch({
		control: form.control,
		name: 'logo',
	})

	const onSubmit: SubmitHandler<FormSchema> = useCallback(
		async values => {
			const [, err] = await updateTemplateAction({
				pageId,
				...template,
				containerId: template.containerId!,
				...values,
				validToDate: values.noExpiry
					? new Date('9999-01-01')
					: values.validToDate,
				templateId: template.templateId!,
			})
		},
		[pageId, template]
	)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='max-w-7xl mx-auto'
			>
				<div className='flex justify-end mb-4'>
					<Button
						type='submit'
						disabled={!form.formState.isValid || form.formState.isSubmitting}
					>
						Lagre
					</Button>
				</div>

				<div className='grid grid-cols-4 gap-8'>
					<div className='col-span-3'>
						<Card className='mb-8'>
							<CardContent className='py-4 flex gap-4 items-center justify-between'>
								<Badge>{templateTypes[TemplateType.Offer]}</Badge>

								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormControl>
												<Input
													placeholder='Navn (intern bruk)'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='active'
									render={({ field }) => (
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
												disabled={!form.formState.isValid}
											/>
										</FormControl>
									)}
								/>
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
									imageUrl={
										typeof templateLogoWatch === 'string'
											? templateLogoWatch
											: templateLogoWatch.url
									}
									onFileSelect={({ file, dataUrl }) => {
										// Check if file is maximum 1 MB
										if (parseFloat(bytesToMb(file.size)) > 1) {
											form.setError('logo', {
												message: 'Fil er for stor. Kan maks være 1 MB',
											})
											return
										}

										form.setValue(
											'logo',
											{
												name: file.name,
												url: dataUrl,
											},
											{ shouldValidate: true }
										)
									}}
								/>
							</CardContent>
						</Card>

						<Card className='mb-8'>
							<CardHeader>
								<CardTitle>Innhold</CardTitle>
							</CardHeader>
							<CardContent>
								<FormField
									control={form.control}
									name='header'
									render={({ field }) => (
										<FormItem className='mb-4'>
											<FormLabel>Overskrift</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='text'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tekst</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													rows={10}
												/>
											</FormControl>
										</FormItem>
									)}
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
											<TableHead>Produkt</TableHead>
											<TableHead>Produkt ID</TableHead>
											<TableHead>Pris</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{templateOffersFieldArray.fields.map((offer, index) => (
											<TableRow key={offer.id}>
												<TableCell>
													<FormField
														control={form.control}
														name={`offers.${index}.name`}
														render={({ field }) => <Input {...field} />}
													/>
												</TableCell>
												<TableCell>
													<FormField
														control={form.control}
														name={`offers.${index}.text`}
														render={({ field }) => <Textarea {...field} />}
													/>
												</TableCell>
												<TableCell>
													<Combobox
														options={products.map(product => ({
															label: product.name,
															value: product,
															id: product.productId,
														}))}
														onSelect={option => {
															if (!option) return

															form.setValue(
																`offers.${index}.product`,
																{
																	name: option.label,
																	productId: option.id.toString(),
																},
																{ shouldValidate: true }
															)
														}}
													/>
												</TableCell>
												<TableCell>
													<Input
														value={offer.product.productId}
														readOnly
														disabled
													/>
												</TableCell>
												<TableCell>
													<FormField
														control={form.control}
														name={`offers.${index}.price`}
														render={({ field }) => (
															<Input
																type='number'
																{...field}
																onChange={e => {
																	field.onChange(parseInt(e.target.value))
																}}
															/>
														)}
													/>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>

							<CardFooter className='border-t px-4 py-2'>
								<Button
									size='sm'
									variant='ghost'
									className='gap-1'
									type='button'
									onClick={() => {
										templateOffersFieldArray.append({
											name: '',
											price: 0,
											product: {
												name: '',
												productId: '',
											},
											sortOrder: templateOffersFieldArray.fields.length + 1,
											text: '',
										})
									}}
								>
									<PlusCircle className='h-3.5 w-3.5' />
									Legg til tilbud
								</Button>
							</CardFooter>
						</Card>
					</div>

					<Card>
						<CardContent>
							<div className='mt-4'>
								{!noExpiryWatch && (
									<FormField
										control={form.control}
										name='validToDate'
										render={({ field }) => (
											<FormItem className='mb-4'>
												<FormLabel className='block'>Gyldig til</FormLabel>

												<DatePicker
													value={field.value}
													onChange={field.onChange}
													disabled={date =>
														date.setHours(0, 0, 0, 0) <
														new Date().setHours(0, 0, 0, 0)
													}
												/>
											</FormItem>
										)}
									/>
								)}

								<FormField
									control={form.control}
									name='noExpiry'
									render={({ field }) => (
										<FormItem className='mb-4'>
											<FormLabel className='block'>Uten utløp</FormLabel>

											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<Accordion
									type='single'
									className='w-full'
									collapsible
								>
									<AccordionItem value='item-1'>
										<AccordionTrigger>Meta informasjon</AccordionTrigger>
										<AccordionContent className='flex flex-col gap-4'>
											<div>Template ID: {template.templateId}</div>
											<div>
												Opprettet:{' '}
												{new Intl.DateTimeFormat('nb-NO', {
													dateStyle: 'medium',
												}).format(new Date(template.createdDate!))}
											</div>
											<div>
												Sist endret:{' '}
												{new Intl.DateTimeFormat('nb-NO', {
													dateStyle: 'medium',
												}).format(new Date(template.changedDate!))}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</CardContent>
					</Card>
				</div>
			</form>
		</Form>
	)
}

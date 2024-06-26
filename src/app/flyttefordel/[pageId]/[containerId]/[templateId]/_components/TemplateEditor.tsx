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
	FormMessage,
} from '@/components/ui/form'
import { useCallback, useEffect } from 'react'
import Combobox from '@/components/form-control/Combobox'
import { bytesToMb } from '@/lib/utils'
import { updateTemplateAction } from '../_actions/updateTemplateAction'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import MoveTemplateDialog from './MoveTemplateDialog'
import { GetAllPagesVm } from '@/types/api/page'
import { GetAllContainersVm } from '@/types/api/container'
import CopyTemplateButton from './CopyTemplateButton'
import DeleteTemplateButton from './DeleteTemplateButton'
import AddTemplateOfferFormDialog from './AddTemplateOfferFormDialog'
import { GetAllProductsVm } from '@/types/api/product'
import EditTermsFormDialog from './EditTermsFormDialog'
import { useParams } from 'next/navigation'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import DeleteTemplateOfferButton from './DeleteTemplateOfferButton'

type Props = {
	template: GetTemplateByKeyVm
	products: Pick<GetAllProductsVm, 'name' | 'productId'>[]
	pages: GetAllPagesVm[]
	containers: GetAllContainersVm[]
}

type FormSchema = z.infer<typeof formSchema>

const formSchema = z.object({
	noExpiry: z.boolean(),
	name: z.string().trim().min(1, 'Navn kan ikke være tomt'),
	active: z.boolean(),
	header: z.string().trim().min(1, 'Overskrift kan ikke være tomt'),
	text: z
		.string()
		.trim()
		.min(1, 'Tekst kan ikke være tomt')
		.max(256, 'Tekst kan maks være 256 tegn'),
	logo: z
		.object({
			name: z.string().min(1),
			url: z.string().min(1),
		})
		.or(z.string())
		.refine(val => {
			if (typeof val === 'object') {
				return val.name !== '' && val.url !== ''
			}

			return true
		}, 'Et bilde/logo må legges til'),
	validToDate: z.date(),
	terms: z.string(),
	offers: z
		.array(
			z.object({
				name: z.string().trim().min(1),
				sortOrder: z.number(),
				text: z.string().trim().min(1),
				price: z.number(),
				product: z.object({
					name: z.string().trim().min(1),
					productId: z.string(),
				}),
				templateOfferId: z.string(),
			})
		)
		.min(1, 'Minst 1 tilbud må være lagt til'),
})

export default function TemplateEditor({
	template,
	products,
	pages,
	containers,
}: Props) {
	const params = useParams()

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
			terms: template.terms || '',
		},
	})

	const templateOffersFieldArray = useFieldArray({
		control: form.control,
		name: 'offers',
	})

	const templateOffersWatch = useWatch({
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
			await updateTemplateAction({
				pageId: params.pageId as string,
				...template,
				containerId: template.containerId!,
				...values,
				validToDate: values.noExpiry
					? new Date('9999-01-01')
					: values.validToDate,
				templateId: template.templateId!,
				offers: values.offers.map(offer => ({
					...offer,
					productId: offer.product.productId,
				})),
			})

			// When saving changes we want to reset form to hva a "new" default state for isDirty value
			// to work properly after saving changes
			form.reset(values)
		},
		[form, params.pageId, template]
	)

	useEffect(() => {
		form.trigger()
	}, [])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='max-w-7xl mx-auto'
			>
				<div className='flex justify-end mb-4'>
					<Button
						type='submit'
						disabled={!form.formState.isValid || !form.formState.isDirty}
						loading={form.formState.isSubmitting}
					>
						Lagre
					</Button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-4 md:gap-8 mb-8'>
					<div className='col-span-3 order-2 md:order-1'>
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

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='active'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
													disabled={!form.formState.isValid}
												/>
											</FormControl>
										</FormItem>
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
								<FormField
									control={form.control}
									name='logo'
									render={({ field }) => (
										<FormItem>
											<FileUpload
												imageUrl={
													typeof templateLogoWatch === 'string'
														? templateLogoWatch
														: templateLogoWatch.url
												}
												onFileSelect={({ file, dataUrl }) => {
													if (
														!['image/png', 'image/jpeg'].includes(file.type)
													) {
														form.setError('logo', {
															message: 'Fil må være et bilde',
														})
														return
													}

													if (parseFloat(bytesToMb(file.size)) > 1) {
														// Check if file is maximum 1 MB
														form.setError('logo', {
															message: 'Fil er for stor. Kan maks være 1 MB',
														})
														return
													}

													field.onChange({
														name: file.name,
														url: dataUrl,
													})
												}}
											/>

											<FormMessage />
										</FormItem>
									)}
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
											<FormMessage />
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
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					</div>

					<Card className='order-1 md:order-2'>
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

								<EditTermsFormDialog
									terms={template.terms}
									onSubmit={({ terms }) => {
										form.setValue('terms', terms, {
											shouldValidate: true,
											shouldDirty: true,
										})
									}}
								/>

								<Accordion
									type='multiple'
									className='w-full'
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

									<AccordionItem value='item-2'>
										<AccordionTrigger>Meta innstillinger</AccordionTrigger>
										<AccordionContent className='flex flex-col gap-4'>
											<MoveTemplateDialog
												pages={pages}
												containers={containers}
											/>

											<CopyTemplateButton />

											<DeleteTemplateButton />
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Tilbud</CardTitle>
						<CardDescription>
							Tilbud knyttet til annonse. Dette er det kunden kan bestille.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<FormField
							control={form.control}
							name='offers'
							render={() => (
								<FormItem>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Name</TableHead>
												<TableHead className='max-w-32'>Tekst</TableHead>
												<TableHead>Produkt</TableHead>
												<TableHead>Produkt ID</TableHead>
												<TableHead>Pris</TableHead>
												<TableHead>
													<span className='sr-only'>Handlinger</span>
												</TableHead>
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
														<FormField
															control={form.control}
															name={`offers.${index}.product`}
															render={({ field }) => (
																<Combobox
																	defaultValue={{
																		label: field.value.name,
																		value: field.value.productId,
																	}}
																	options={products.map(product => ({
																		label: product.name!,
																		value: product.productId!,
																	}))}
																	onSelect={option => {
																		field.onChange({
																			name: option.label,
																			productId: option.value,
																		})
																	}}
																/>
															)}
														/>
													</TableCell>
													<TableCell>
														{
															templateOffersWatch.find(
																templateOffer =>
																	templateOffer.templateOfferId ===
																	offer.templateOfferId
															)?.product.productId
														}
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
																<DropdownMenuLabel>
																	Handlinger
																</DropdownMenuLabel>
																<DropdownMenuSeparator />
																<DeleteTemplateOfferButton
																	templateOfferId={offer.templateOfferId}
																	afterDelete={() => {
																		templateOffersFieldArray.remove(index)
																	}}
																/>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>

									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>

					<CardFooter className='border-t px-4 py-2'>
						<AddTemplateOfferFormDialog
							products={products}
							sortOrder={templateOffersWatch.length + 1}
							onSubmit={data => {
								templateOffersFieldArray.append(data)

								form.resetField('offers', {
									defaultValue: [...templateOffersWatch, data],
								})

								document.getElementById('closeDialog')?.click()
							}}
						/>
					</CardFooter>
				</Card>
			</form>
		</Form>
	)
}

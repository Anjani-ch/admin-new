'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { createTemplateAction } from './_actions/createTemplateAction'
import { useToast } from '@/components/ui/use-toast'
import { TemplateType } from '@/types/api/template'
import { templateTypes } from '@/constants/template'
import { DatePicker } from '@/components/form-control/DatePicker'

type Props = {
	pageId: string
	containerId: string
	afterSubmit?: () => void
}

type FormSchema = z.infer<typeof formSchema>

const formSchema = z.object({
	name: z.string().min(1),
	active: z.boolean(),
	validToDate: z.date(),
	noExpiry: z.boolean(),
	templateTypeId: z.number(),
})

export default function CreateTemplateForm({
	pageId,
	containerId,
	afterSubmit,
}: Props) {
	const { toast } = useToast()

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			active: false,
			validToDate: new Date(),
			templateTypeId: TemplateType.Offer,
			noExpiry: false,
		},
	})

	const noExpiryWatch = useWatch({
		control: form.control,
		name: 'noExpiry',
	})

	const onSubmit: SubmitHandler<FormSchema> = useCallback(
		async values => {
			const [, err] = await createTemplateAction({
				...values,
				validToDate: values.noExpiry
					? new Date('9999-01-01')
					: values.validToDate,
				containerId,
				pageId,
			})

			if (err) {
				toast({
					title: 'Kunne ikke opprette annonse',
					description: err.message,
				})
			} else {
				toast({
					title: 'Vellyket',
					description: `Annonse ${values.name} opprettet`,
				})
			}

			if (afterSubmit) afterSubmit()
		},
		[afterSubmit, containerId, pageId, toast]
	)

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='mb-4'>
								<FormLabel>Navn</FormLabel>

								<FormControl>
									<Input
										placeholder='Navn'
										{...field}
									/>
								</FormControl>

								<FormDescription>
									Dette er navnet på siden som brukere på flyttefordel vi se.
								</FormDescription>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='templateTypeId'
						render={({ field }) => (
							<FormItem className='mb-4'>
								<FormLabel>Annonse type</FormLabel>

								<Select
									onValueChange={field.onChange}
									defaultValue={field.value.toString()}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Type' />
										</SelectTrigger>
									</FormControl>

									<SelectContent>
										{Object.keys(templateTypes).map(key => (
											<SelectItem
												key={key}
												value={key}
											>
												{
													templateTypes[
														parseInt(key) as keyof typeof templateTypes
													]
												}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>

					{!noExpiryWatch && (
						<FormField
							control={form.control}
							name='validToDate'
							render={({ field }) => (
								<FormItem className='mb-3'>
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

					<FormField
						control={form.control}
						name='active'
						render={({ field }) => (
							<FormItem className='mb-4'>
								<FormLabel>Aktiv</FormLabel>

								<FormDescription>
									Aktiv betyr at det blir synlig for brukere som går gjennom
									flyttefordel
								</FormDescription>

								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						disabled={!form.formState.isValid || form.formState.isSubmitting}
					>
						Opprett
					</Button>
				</form>
			</Form>
		</div>
	)
}

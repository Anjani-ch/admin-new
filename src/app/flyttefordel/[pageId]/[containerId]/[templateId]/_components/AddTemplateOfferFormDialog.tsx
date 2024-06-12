'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback } from 'react'
import Combobox from '@/components/form-control/Combobox'
import { GetAllProductsVm } from '@/types/api/product'
import { createTemplateOfferAction } from '../_actions/createTemplateOfferAction'
import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
	FormField,
} from '@/components/ui/form'

type Props = {
	products: Pick<GetAllProductsVm, 'name' | 'productId'>[]
	onSubmit: (
		data: FormSchema & {
			templateOfferId: string
			sortOrder: number
			product: { name: string; productId: string }
		}
	) => void
	sortOrder: number
}

type FormSchema = z.infer<typeof zodSchema>

const zodSchema = z.object({
	name: z.string().min(1),
	product: z.object({
		name: z.string().min(1),
		productId: z.string().min(1),
	}),
	text: z.string().min(1),
	price: z.number(),
})

export default function AddTemplateOfferFormDialog({
	products,
	onSubmit,
	sortOrder,
}: Props) {
	const params = useParams()

	const form = useForm<FormSchema>({
		mode: 'all',
		resolver: zodResolver(zodSchema),
		defaultValues: {
			name: '',
			product: { name: '', productId: '' },
			text: '',
			price: 0,
		},
	})

	const submitHandler: SubmitHandler<FormSchema> = useCallback(
		async values => {
			const [res] = await createTemplateOfferAction({
				...values,
				productId: values.product.productId,
				sortOrder,
				templateId: params.templateId as string,
				containerId: params.containerId as string,
				pageId: params.pageId as string,
			})

			if (!res) return

			onSubmit({ ...values, templateOfferId: res.templateOfferId, sortOrder })
		},
		[onSubmit, params.containerId, params.pageId, params.templateId, sortOrder]
	)

	return (
		<Dialog
			onOpenChange={open => {
				if (!open) form.reset()
			}}
		>
			<DialogTrigger asChild>
				<Button
					size='sm'
					variant='ghost'
					className='gap-1'
					type='button'
				>
					<PlusCircle className='h-3.5 w-3.5' />
					Legg til tilbud
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Legg til tilbud</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Navn</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='product'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Produkt</FormLabel>

								<Combobox
									defaultValue={{
										label: field.value.name,
										value: field.value.productId,
										id: field.value.productId,
									}}
									options={products.map(product => ({
										label: product.name!,
										value: product.productId,
										id: product.productId!,
									}))}
									onSelect={option => {
										field.onChange({
											name: option.label,
											productId: option.id.toString(),
										})
									}}
								/>
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
									<Textarea {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='price'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pris</FormLabel>

								<FormControl>
									<Input
										type='number'
										{...field}
										onChange={e =>
											field.onChange(
												e.target.value ? parseFloat(e.target.value) : 0
											)
										}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button
						type='button'
						onClick={form.handleSubmit(submitHandler)}
						disabled={!form.formState.isValid}
						loading={form.formState.isSubmitting}
					>
						Lagre
					</Button>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

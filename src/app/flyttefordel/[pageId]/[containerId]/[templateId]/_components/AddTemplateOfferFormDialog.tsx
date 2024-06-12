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
import { Label } from '@/components/ui/label'
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
import { GetAllTemplateOfferVm } from '@/types/api/templateOffer'

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

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { isValid, isSubmitting },
	} = useForm<FormSchema>({
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
			const [res, err] = await createTemplateOfferAction({
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
				if (!open) reset()
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

				<div>
					<Label htmlFor='template-offer-dialog-name'>Navn</Label>
					<Input
						id='template-offer-dialog-name'
						{...register('name')}
					/>
				</div>

				<div>
					<Label
						htmlFor='template-offer-dialog-product'
						className='block'
					>
						Produkt
					</Label>
					<Combobox
						options={products.map(product => ({
							label: product.name!,
							value: product.productId,
							id: product.productId!,
						}))}
						onSelect={option => {
							setValue(
								'product',
								{
									name: option.label,
									productId: option.id.toString(),
								},
								{
									shouldValidate: true,
								}
							)
						}}
					/>
				</div>

				<div>
					<Label htmlFor='template-offer-dialog-text'>Tekst</Label>
					<Textarea
						id='template-offer-dialog-text'
						{...register('text')}
					/>
				</div>

				<div>
					<Label htmlFor='template-offer-dialog-number'>Pris</Label>
					<Input
						id='template-offer-dialog-number'
						type='number'
						{...register('price', { valueAsNumber: true })}
					/>
				</div>

				<Button
					type='button'
					onClick={handleSubmit(submitHandler)}
					disabled={!isValid}
					loading={isSubmitting}
				>
					Lagre
				</Button>
			</DialogContent>
		</Dialog>
	)
}

'use client'

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useCallback } from 'react'

type Props = {
	onSubmit: (data: FormSchema) => void
	terms?: string
}

type FormSchema = z.infer<typeof formSchema>

const formSchema = z.object({
	terms: z.string(),
})

export default function EditTermsFormDialog({ onSubmit, terms }: Props) {
	const form = useForm<FormSchema>({
		mode: 'all',
		resolver: zodResolver(formSchema),
		defaultValues: {
			terms: terms || '',
		},
	})

	const submitHandler: SubmitHandler<FormSchema> = useCallback(onSubmit, [
		onSubmit,
	])

	return (
		<Dialog
			onOpenChange={open => {
				if (!open) form.handleSubmit(submitHandler)()
			}}
		>
			<DialogTrigger asChild>
				<Button
					className='my-6'
					size='sm'
				>
					Rediger vilkår
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Vilkår</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<FormField
						control={form.control}
						name='terms'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										{...field}
										rows={10}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</Form>

				<DialogClose asChild>
					<Button>Lukk</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	)
}

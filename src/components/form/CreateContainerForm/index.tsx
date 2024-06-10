'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
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
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { createContainerAction } from './_actions/createContainerAction'
import { useToast } from '@/components/ui/use-toast'

type Props = {
	pageId: string
	sortOrder: number
	afterSubmit?: () => void
}

type FormSchema = z.infer<typeof formSchema>

const formSchema = z.object({
	name: z.string().min(1),
	active: z.boolean(),
})

export default function CreateContainerForm({
	sortOrder,
	pageId,
	afterSubmit,
}: Props) {
	const { toast } = useToast()

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			active: false,
		},
	})

	const onSubmit: SubmitHandler<FormSchema> = useCallback(
		async values => {
			const [, err] = await createContainerAction({
				...values,
				sortOrder,
				pageId,
			})

			if (err) {
				toast({
					title: 'Kunne ikke opprette container',
					description: err.message,
				})
			} else {
				toast({
					title: 'Vellyket',
					description: `Container ${values.name} opprettet`,
				})
			}

			if (afterSubmit) afterSubmit()
		},
		[afterSubmit, pageId, sortOrder, toast]
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

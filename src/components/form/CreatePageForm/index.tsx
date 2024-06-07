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
import { createPageAction } from './_actions/createPageAction'

type Props = {
	endpointId: number
	afterSubmit?: () => void
}

type FormSchema = z.infer<typeof formSchema>

const formSchema = z.object({
	name: z.string().min(1),
	active: z.boolean(),
})

export default function CreatePageForm({ endpointId, afterSubmit }: Props) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			active: false,
		},
	})

	const onSubmit: SubmitHandler<FormSchema> = useCallback(
		async values => {
			await createPageAction({
				...values,
				endpointId,
			})

			if (afterSubmit) afterSubmit()
		},
		[afterSubmit, endpointId]
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

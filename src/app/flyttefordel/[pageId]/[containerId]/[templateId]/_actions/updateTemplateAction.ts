'use server'

import { updateTemplate, updateTemplateLogo } from '@/data-access/template'
import {
	updateTemplateBlobUseCase,
	updateTemplateUseCase,
} from '@/use-cases/template'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const updateTemplateAction = createServerAction()
	.input(
		z.object({
			pageId: z.string(),
			containerId: z.string(),
			templateId: z.string(),
			name: z.string().trim().min(1),
			active: z.boolean(),
			header: z.string().trim().min(1),
			text: z.string().trim().min(1).max(256),
			logo: z
				.object({
					name: z.string(),
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
	)
	.handler(async ({ input }) => {
		// If logo is not string/URL then we have to create a new logo from data provided
		if (typeof input.logo !== 'string') {
			await updateTemplateBlobUseCase(
				{ updateTemplateLogo },
				{
					name: input.logo.name,
					content: input.logo.url.split(',')[1],
					templateId: input.templateId,
					isLogo2: false,
				}
			)
		}

		await updateTemplateUseCase(
			{ updateTemplate },
			{
				...input,
				validToDate: input.validToDate.toISOString().replace(/.\d{3}Z/, 'Z'),
				limitDays: 0,
				offers: input.offers as any[],
			}
		)

		revalidatePath(
			`/flyttefordel/${input.pageId}/${input.containerId}/${input.templateId}`
		)
	})

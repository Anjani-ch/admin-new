'use server'

import { createTemplateOffer } from '@/data-access/template-offer'
import { createTemplateOfferUseCase } from '@/use-cases/template-offer'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const createTemplateOfferAction = createServerAction()
	.input(
		z.object({
			name: z.string().min(1),
			productId: z.string().min(1),
			sortOrder: z.number(),
			text: z.string().min(1),
			price: z.number(),
			templateId: z.string(),
			containerId: z.string(),
			pageId: z.string(),
		})
	)
	.output(
		z.object({
			templateOfferId: z.string(),
		})
	)
	.handler(async ({ input }) => {
		const { templateOfferId } = await createTemplateOfferUseCase(
			{ createTemplateOffer },
			input
		)

		revalidatePath(
			`/flyttefordel/${input.pageId}/${input.containerId}/${input.templateId}`
		)

		return { templateOfferId }
	})

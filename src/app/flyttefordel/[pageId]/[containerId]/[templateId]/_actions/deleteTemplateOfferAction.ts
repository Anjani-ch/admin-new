'use server'

import { deleteTemplateOffer } from '@/data-access/template-offer'
import { deleteTemplateOfferUseCase } from '@/use-cases/template-offer'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const deleteTemplateOfferAction = createServerAction()
	.input(
		z.object({
			templateOfferId: z.string(),
		})
	)
	.handler(async ({ input: { templateOfferId } }) => {
		await deleteTemplateOfferUseCase(
			{ deleteTemplateOffer },
			{ templateOfferId }
		)
	})

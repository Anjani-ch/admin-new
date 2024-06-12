'use server'

import { deleteTemplateById } from '@/data-access/template'
import { getTemplateOffers } from '@/data-access/template-offer'
import { deleteTemplateUseCase } from '@/use-cases/template'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction, ZSAError } from 'zsa'

export const deleteTemplateAction = createServerAction()
	.input(
		z.object({
			templateId: z.string(),
			containerId: z.string(),
			pageId: z.string(),
		})
	)
	.handler(async ({ input: { templateId, containerId, pageId } }) => {
		const { errors } = await deleteTemplateUseCase(
			{ deleteTemplateById, getTemplateOffers },
			{ templateId }
		)

		if (errors?.childTemplateOffers) {
			throw new ZSAError(
				'CONFLICT',
				'Template kunne ikke slettes, sjekk at alle tilbud i template er slettet'
			)
		}

		revalidatePath(`/flyttefordel/${pageId}/${containerId}`)
	})

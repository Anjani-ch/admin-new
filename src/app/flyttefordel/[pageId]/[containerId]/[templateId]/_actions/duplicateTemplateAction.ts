'use server'

import { duplicateTemplate } from '@/data-access/template'
import { duplicateTemplateUseCase } from '@/use-cases/template'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const duplicateTemplateAction = createServerAction()
	.input(
		z.object({
			pageId: z.string(),
			containerId: z.string(),
			templateId: z.string(),
		})
	)
	.output(
		z.object({
			templateUrl: z.string(),
		})
	)
	.handler(async ({ input: { pageId, containerId, templateId } }) => {
		const { templateId: newTemplateId } = await duplicateTemplateUseCase(
			{ duplicateTemplate },
			{ templateId }
		)

		return {
			templateUrl: `/flyttefordel/${pageId}/${containerId}/${newTemplateId}`,
		}
	})

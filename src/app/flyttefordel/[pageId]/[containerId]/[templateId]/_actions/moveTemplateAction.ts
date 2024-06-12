'use server'

import { moveTemplate } from '@/data-access/template'
import { moveTemplateUseCase } from '@/use-cases/template'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const moveTemplateAction = createServerAction()
	.input(
		z.object({
			containerId: z.string(),
			templateId: z.string(),
		})
	)
	.handler(async ({ input: { containerId, templateId } }) => {
		await moveTemplateUseCase(
			{ moveTemplate },
			{ containerId: containerId!, templateId }
		)
	})

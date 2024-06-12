'use server'

import { duplicateTemplate } from '@/data-access/template'
import { duplicateTemplateUseCase } from '@/use-cases/template'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const duplicateTemplateAction = createServerAction()
	.input(
		z.object({
			templateId: z.string(),
		})
	)
	.output(
		z.object({
			newTemplateId: z.string(),
		})
	)
	.handler(async ({ input: { templateId } }) => {
		const { templateId: newTemplateId } = await duplicateTemplateUseCase(
			{ duplicateTemplate },
			{ templateId }
		)

		return {
			newTemplateId,
		}
	})

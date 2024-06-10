'use server'

import { templateTypes } from '@/constants/template'
import { createTemplate } from '@/data-access/template'
import { createTemplateUseCase } from '@/use-cases/template'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const createTemplateAction = createServerAction()
	.input(
		z.object({
			containerId: z.string(),
			templateTypeId: z
				.number()
				.refine(val => Object.keys(templateTypes).includes(val.toString())),
			name: z.string().min(1),
			active: z.boolean(),
			validToDate: z.date(),
			pageId: z.string(),
		})
	)
	.handler(async ({ input }) => {
		await createTemplateUseCase({ createTemplate }, input)

		revalidatePath(`/flyttefordel/${input.pageId}/${input.containerId}`)
	})

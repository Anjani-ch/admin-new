'use server'

import { createPage } from '@/data-access/page'
import { createPageUseCase } from '@/use-cases/page'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const createPageAction = createServerAction()
	.input(
		z.object({
			name: z.string().min(1),
			active: z.boolean(),
			endpointId: z.number().refine(val => val === 1 || val === 2),
		})
	)
	.handler(async ({ input }) => {
		await createPageUseCase({ createPage }, input)

		revalidatePath('/flyttefordel')
	})

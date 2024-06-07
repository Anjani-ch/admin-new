'use server'

import { createContainer } from '@/data-access/container'
import { createContainerUseCase } from '@/use-cases/container'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const createContainerAction = createServerAction()
	.input(
		z.object({
			name: z.string().min(1),
			sortOrder: z.number(),
			active: z.boolean(),
			pageId: z.string(),
		})
	)
	.handler(async ({ input }) => {
		await createContainerUseCase({ createContainer }, input)

		revalidatePath(`/flyttefordel/${input.pageId}`)
	})

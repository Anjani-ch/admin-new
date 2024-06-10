'use server'

import { getContainers } from '@/data-access/container'
import { deletePageById } from '@/data-access/page'
import { deletePageUseCase } from '@/use-cases/page'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction, ZSAError } from 'zsa'

export const deletePageAction = createServerAction()
	.input(
		z.object({
			pageId: z.string(),
		})
	)
	.handler(async ({ input: { pageId } }) => {
		const { errors } = await deletePageUseCase(
			{ deletePageById, getContainers },
			{ pageId }
		)

		if (errors?.childContainers) {
			throw new ZSAError(
				'CONFLICT',
				'Side kunne ikke slettes, sjekk at containers til side er slettet'
			)
		}

		revalidatePath('/flyttefordel')
	})

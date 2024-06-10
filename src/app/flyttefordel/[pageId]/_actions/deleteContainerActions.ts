'use server'

import { deleteContainerById } from '@/data-access/container'
import { getTemplates } from '@/data-access/template'
import { deleteContainerUseCase } from '@/use-cases/container'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction, ZSAError } from 'zsa'

export const deleteContainerAction = createServerAction()
	.input(
		z.object({
			containerId: z.string(),
			pageId: z.string(),
		})
	)
	.handler(async ({ input: { containerId, pageId } }) => {
		const { errors } = await deleteContainerUseCase(
			{ deleteContainerById, getTemplates },
			{ containerId }
		)

		if (errors?.childTemplates) {
			throw new ZSAError(
				'CONFLICT',
				'Container kunne ikke slettes, sjekk at templates i container er slettet'
			)
		}

		revalidatePath(`/flyttefordel/${pageId}/${containerId}`)
	})

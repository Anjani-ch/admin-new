import { CreatePageDto } from '@/types/api/page'
import { GetPages, CreatePage, DeletePageById, GetContainers } from './types'

export const getPagesUseCase = async (context: { getPages: GetPages }) => {
	return context.getPages()
}

export const createPageUseCase = async (
	context: { createPage: CreatePage },
	data: CreatePageDto
) => {
	await context.createPage(data)
}

export const deletePageUseCase = async (
	context: { deletePageById: DeletePageById; getContainers: GetContainers },
	data: {
		pageId: string
	}
) => {
	let errors = null

	const containers = await context.getContainers()

	const containersInPage = containers.filter(
		container => container.pageId === data.pageId
	)

	// Add rule that page cannot be deleted if containers found
	// linked to page
	if (containersInPage.length !== 0) {
		errors = {
			childContainers: true,
		}
	}

	await context.deletePageById(data.pageId)

	return { errors }
}

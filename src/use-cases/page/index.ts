import { CreatePageDto } from '@/types/api/page'
import {
	GetPages,
	CreatePage,
	DeletePageById,
	GetContainers,
	GetPageById,
} from './types'

export const getPagesUseCase = async (
	context: { getPages: GetPages },
	data?: { endpointId: number }
) => {
	let pages = await context.getPages()

	if (data?.endpointId)
		pages = pages.filter(page => page.endpointId === data?.endpointId)

	return pages
}

export const createPageUseCase = async (
	context: { createPage: CreatePage },
	data: CreatePageDto
) => {
	await context.createPage(data)
}

export const getPageByIdUseCase = async (
	context: { getPageById: GetPageById },
	data: { pageId: string }
) => {
	return await context.getPageById(data.pageId)
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

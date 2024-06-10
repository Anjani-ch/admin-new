import { CreateContainerDto } from '@/types/api/container'
import {
	CreateContainer,
	GetContainers,
	DeleteContainerById,
	GetTemplates,
} from './types'

export const getContainersUseCase = async (context: {
	getContainers: GetContainers
}) => {
	return await context.getContainers()
}

export const createContainerUseCase = async (
	context: { createContainer: CreateContainer },
	data: CreateContainerDto
) => {
	await context.createContainer(data)
}

export const deleteContainerUseCase = async (
	context: {
		deleteContainerById: DeleteContainerById
		getTemplates: GetTemplates
	},
	data: {
		containerId: string
	}
) => {
	let errors = null

	const templates = await context.getTemplates()

	const templatesInPage = templates.filter(
		template => template.containerId === data.containerId
	)

	// Add rule that page cannot be deleted if templates found
	// linked to page
	if (templatesInPage.length !== 0) {
		errors = {
			childTemplates: true,
		}
	}

	await context.deleteContainerById(data.containerId)

	return { errors }
}

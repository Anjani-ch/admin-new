import { CreateContainerDto } from '@/types/api/container'
import { CreateContainer, GetContainers } from './types'

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

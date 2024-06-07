import { GetContainers } from './types'

export const getContainersUseCase = async (context: {
	getContainers: GetContainers
}) => {
	return await context.getContainers()
}

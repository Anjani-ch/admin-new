import { getApiClient } from '@/lib/axios'
import { CreateContainerDto, GetAllContainersVm } from '@/types/api/container'

export const getContainers = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllContainersVm[]>('/api/container/all')

	return data
}

export const createContainer = async (dto: CreateContainerDto) => {
	const client = await getApiClient()

	await client.post('/api/container', dto)
}

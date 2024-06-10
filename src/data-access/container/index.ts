import { getApiClient } from '@/lib/axios'
import {
	CreateContainerDto,
	GetAllContainersVm,
	GetContainerByKeyVm,
} from '@/types/api/container'

export const getContainers = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllContainersVm[]>('/api/container/all')

	return data
}

export const getContainerById = async (containerId: string) => {
	const client = await getApiClient()

	const { data } = await client.get<GetContainerByKeyVm>(
		`/api/container/${containerId}`
	)

	return data
}

export const createContainer = async (dto: CreateContainerDto) => {
	const client = await getApiClient()

	await client.post('/api/container', dto)
}

export const deleteContainerById = async (id: string) => {
	const client = await getApiClient()

	await client.delete(`/api/container/${id}`)
}

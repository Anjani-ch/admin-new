import { getApiClient } from '@/lib/axios'
import { GetAllContainersVm } from '@/types/api/container'

export const getContainers = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllContainersVm[]>('/api/container/all')

	return data
}

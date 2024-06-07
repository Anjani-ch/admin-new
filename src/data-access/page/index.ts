import { getApiClient } from '@/lib/axios'
import { GetAllPagesVm } from '@/types/api/page'

export const getPages = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllPagesVm[]>('/api/page/all')

	return data
}

import { getApiClient } from '@/lib/axios'
import { CreatePageDto, GetAllPagesVm } from '@/types/api/page'

export const getPages = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllPagesVm[]>('/api/page/all')

	return data
}

export const createPage = async (dto: CreatePageDto) => {
	const client = await getApiClient()

	await client.post('/api/page', dto)
}

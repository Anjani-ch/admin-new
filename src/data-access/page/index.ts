import { getApiClient } from '@/lib/axios'
import { CreatePageDto, GetAllPagesVm, GetPageByKeyVm } from '@/types/api/page'

export const getPages = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllPagesVm[]>('/api/page/all')

	return data.sort((a, b) => a.sortOrder! - b.sortOrder!)
}

export const getPageById = async (pageId: string) => {
	const client = await getApiClient()

	const { data } = await client.get<GetPageByKeyVm>(`/api/page/${pageId}`)

	return {
		...data,
		containers: data.containers?.sort((a, b) => a.sortOrder! - b.sortOrder!),
	}
}

export const createPage = async (dto: CreatePageDto) => {
	const client = await getApiClient()

	await client.post('/api/page', dto)
}

export const deletePageById = async (pageId: string) => {
	const client = await getApiClient()

	await client.delete(`/api/page/${pageId}`)
}

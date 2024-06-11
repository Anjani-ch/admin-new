import { getApiClient } from '@/lib/axios'
import {
	CreateTemplateDto,
	GetAllTemplateVm,
	GetTemplateByKeyVm,
} from '@/types/api/template'

export const getTemplates = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllTemplateVm[]>('/api/template/all')

	return data
}

export const getTemplateById = async (id: string) => {
	const client = await getApiClient()

	const { data } = await client.get<GetTemplateByKeyVm>(`/api/template/${id}`)

	return data
}

export const createTemplate = async (dto: CreateTemplateDto) => {
	const client = await getApiClient()

	const { headers } = await client.post('/api/template', dto)

	return {
		templateId: (headers.get as (headerName: string) => string)('location')
			.split('/')
			.pop()!,
	}
}

export const deleteTemplateById = async (id: string) => {
	const client = await getApiClient()

	await client.delete(`/api/template/${id}`)
}

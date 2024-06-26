import { getApiClient } from '@/lib/axios'
import {
	CreateTemplateBlobDto,
	CreateTemplateDto,
	GetAllTemplateVm,
	GetTemplateByKeyVm,
	UpdateTemplateDto,
} from '@/types/api/template'

export const getTemplates = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllTemplateVm[]>('/api/template/all')

	return data.sort(
		(a, b) =>
			new Date(b.changedDate!).getTime() - new Date(a.changedDate!).getTime()
	)
}

export const getTemplateById = async (id: string) => {
	const client = await getApiClient()

	const { data } = await client.get<GetTemplateByKeyVm>(`/api/template/${id}`)

	return {
		...data,
		offers: (data.offers || []).sort((a, b) => a.sortOrder! - b.sortOrder!),
	}
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

export const updateTemplate = async (
	dto: UpdateTemplateDto & { templateId: string }
) => {
	const client = await getApiClient()

	await client.put(`api/template/${dto.templateId}`, dto)
}

export const updateTemplateLogo = async (dto: CreateTemplateBlobDto) => {
	const client = await getApiClient()

	await client.post('/api/template/blob', dto)
}

export const duplicateTemplate = async (id: string) => {
	const client = await getApiClient()

	const { headers } = await client.post(`/api/template/copy/${id}`)

	return {
		templateId: (headers.get as (headerName: string) => string)('location')
			.split('/')
			.pop()!,
	}
}

export const moveTemplate = async ({
	templateId,
	containerId,
}: {
	templateId: string
	containerId: string
}) => {
	const client = await getApiClient()

	await client.put(`/api/template/setparent/${templateId}/${containerId}`)
}

export const deleteTemplateById = async (id: string) => {
	const client = await getApiClient()

	await client.delete(`/api/template/${id}`)
}

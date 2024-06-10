import { getApiClient } from '@/lib/axios'
import { GetAllTemplateVm } from '@/types/api/template'

export const getTemplates = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllTemplateVm[]>('/api/template/all')

	return data
}

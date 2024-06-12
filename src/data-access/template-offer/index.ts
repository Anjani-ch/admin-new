import { getApiClient } from '@/lib/axios'
import {
	CreateTemplateOfferDto,
	GetAllTemplateOfferVm,
} from '@/types/api/templateOffer'

export const getTemplateOffers = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllTemplateOfferVm[]>(
		'/api/templateoffer/all'
	)

	return data
}

export const createTemplateOffer = async (dto: CreateTemplateOfferDto) => {
	const client = await getApiClient()

	const { headers } = await client.post('/api/templateoffer', dto)

	return {
		templateOfferId: (headers.get as (headerName: string) => string)('location')
			.split('/')
			.pop()!,
	}
}

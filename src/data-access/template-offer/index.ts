import { getApiClient } from '@/lib/axios'
import { GetAllTemplateOfferVm } from '@/types/api/templateOffer'

export const getTemplateOffers = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllTemplateOfferVm[]>(
		'/api/templateoffer/all'
	)

	return data
}

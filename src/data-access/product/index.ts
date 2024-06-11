import { getApiClient } from '@/lib/axios'
import { GetAllProductsVm } from '@/types/api/product'

export const getProducts = async () => {
	const client = await getApiClient()

	const { data } = await client.get<GetAllProductsVm[]>('/api/product/all')

	return data
}

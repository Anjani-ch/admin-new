import { GetProducts } from './types'

export const getProductsUseCase = async (context: {
	getProducts: GetProducts
}) => {
	return await context.getProducts()
}

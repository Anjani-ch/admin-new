import { CreateTemplateOfferDto } from '@/types/api/templateOffer'
import { CreateTemplateOffer } from './types'

export const createTemplateOfferUseCase = async (
	context: {
		createTemplateOffer: CreateTemplateOffer
	},
	data: CreateTemplateOfferDto
) => {
	return await context.createTemplateOffer(data)
}

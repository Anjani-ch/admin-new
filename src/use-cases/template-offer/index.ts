import { CreateTemplateOfferDto } from '@/types/api/templateOffer'
import { CreateTemplateOffer, DeleteTemplateOffer } from './types'

export const createTemplateOfferUseCase = async (
	context: {
		createTemplateOffer: CreateTemplateOffer
	},
	data: CreateTemplateOfferDto
) => {
	return await context.createTemplateOffer(data)
}

export const deleteTemplateOfferUseCase = async (
	context: { deleteTemplateOffer: DeleteTemplateOffer },
	data: { templateOfferId: string }
) => {
	await context.deleteTemplateOffer(data.templateOfferId)
}

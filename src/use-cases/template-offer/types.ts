import { CreateTemplateOfferDto } from '@/types/api/templateOffer'

export type CreateTemplateOffer = (
	dto: CreateTemplateOfferDto
) => Promise<{ templateOfferId: string }>

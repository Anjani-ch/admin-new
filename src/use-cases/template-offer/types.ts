import { CreateTemplateOfferDto } from '@/types/api/templateOffer'

export type CreateTemplateOffer = (
	dto: CreateTemplateOfferDto
) => Promise<{ templateOfferId: string }>
export type DeleteTemplateOffer = (id: string) => Promise<void>

import { CreateTemplateDto, GetAllTemplateVm } from '@/types/api/template'
import { GetAllTemplateOfferVm } from '@/types/api/templateOffer'

export type GetTemplates = () => Promise<GetAllTemplateVm[]>
export type CreateTemplate = (dto: CreateTemplateDto) => Promise<void>
export type DeleteTemplateById = (id: string) => Promise<void>
export type GetTemplateOffers = () => Promise<GetAllTemplateOfferVm[]>

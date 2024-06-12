import {
	CreateTemplateBlobDto,
	CreateTemplateDto,
	GetAllTemplateVm,
	GetTemplateByKeyVm,
	UpdateTemplateDto,
} from '@/types/api/template'
import { GetAllTemplateOfferVm } from '@/types/api/templateOffer'

export type GetTemplates = () => Promise<GetAllTemplateVm[]>
export type CreateTemplate = (
	dto: CreateTemplateDto
) => Promise<{ templateId: string }>
export type UpdateTemplate = (
	dto: UpdateTemplateDto & { templateId: string }
) => Promise<void>
export type UpdateTemplateLogo = (dto: CreateTemplateBlobDto) => Promise<void>
export type DeleteTemplateById = (id: string) => Promise<void>
export type GetTemplateOffers = () => Promise<GetAllTemplateOfferVm[]>
export type GetTemplateById = (id: string) => Promise<GetTemplateByKeyVm>
export type DuplicateTemplate = (id: string) => Promise<{ templateId: string }>
export type MoveTemplate = (data: {
	templateId: string
	containerId: string
}) => Promise<void>

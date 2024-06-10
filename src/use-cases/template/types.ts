import { CreateTemplateDto, GetAllTemplateVm } from '@/types/api/template'

export type GetTemplates = () => Promise<GetAllTemplateVm[]>
export type CreateTemplate = (dto: CreateTemplateDto) => Promise<void>

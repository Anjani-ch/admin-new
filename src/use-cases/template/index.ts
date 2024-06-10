import { CreateTemplateDto } from '@/types/api/template'
import { CreateTemplate, GetTemplates } from './types'

export const getTemplatesUseCase = async (context: {
	getTemplates: GetTemplates
}) => {
	return context.getTemplates()
}

export const createTemplateUseCase = async (
	context: { createTemplate: CreateTemplate },
	data: CreateTemplateDto
) => {
	return await context.createTemplate(data)
}

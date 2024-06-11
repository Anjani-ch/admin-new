import {
	CreateTemplateBlobDto,
	CreateTemplateDto,
	UpdateTemplateDto,
} from '@/types/api/template'
import {
	CreateTemplate,
	GetTemplates,
	DeleteTemplateById,
	GetTemplateOffers,
	GetTemplateById,
	UpdateTemplate,
	UpdateTemplateLogo,
} from './types'

export const getTemplatesUseCase = async (context: {
	getTemplates: GetTemplates
}) => {
	return context.getTemplates()
}

export const getTemplateByIdUseCase = async (
	context: { getTemplateById: GetTemplateById },
	data: { templateId: string }
) => {
	return await context.getTemplateById(data.templateId)
}

export const createTemplateUseCase = async (
	context: { createTemplate: CreateTemplate },
	data: CreateTemplateDto
) => {
	return await context.createTemplate(data)
}

export const updateTemplateUseCase = async (
	context: {
		updateTemplate: UpdateTemplate
		updateTemplateLogo?: UpdateTemplateLogo
	},
	data: UpdateTemplateDto & { templateId: string }
) => {
	await context.updateTemplate(data)
}

export const updateTemplateBlobUseCase = async (
	context: {
		updateTemplateLogo: UpdateTemplateLogo
	},
	data: CreateTemplateBlobDto
) => {
	await context.updateTemplateLogo(data)
}

export const deleteTemplateUseCase = async (
	context: {
		deleteTemplateById: DeleteTemplateById
		getTemplateOffers: GetTemplateOffers
	},
	data: {
		templateId: string
	}
) => {
	let errors = null

	const templates = await context.getTemplateOffers()

	const templateOffersInPage = templates.filter(
		template => template.templateId === data.templateId
	)

	// Add rule that page cannot be deleted if templates found
	// linked to page
	if (templateOffersInPage.length !== 0) {
		errors = {
			childTemplateOffers: true,
		}
	}

	await context.deleteTemplateById(data.templateId)

	return { errors }
}

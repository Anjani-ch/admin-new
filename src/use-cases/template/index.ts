import { CreateTemplateDto } from '@/types/api/template'
import {
	CreateTemplate,
	GetTemplates,
	DeleteTemplateById,
	GetTemplateOffers,
} from './types'

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

import { CreatePageDto } from '@/types/api/page'
import { GetPages, CreatePage } from './types'

export const getPagesUseCase = async (context: { getPages: GetPages }) => {
	return context.getPages()
}

export const createPageUseCase = async (
	context: { createPage: CreatePage },
	data: CreatePageDto
) => {
	await context.createPage(data)
}

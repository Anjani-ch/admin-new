import { GetTemplates } from './types'

export const getTemplatesUseCase = async (context: {
	getTemplates: GetTemplates
}) => {
	return context.getTemplates()
}

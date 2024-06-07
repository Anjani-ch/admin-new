import { GetPages } from './types'

export const getPagesUseCase = async (context: { getPages: GetPages }) => {
	return context.getPages()
}

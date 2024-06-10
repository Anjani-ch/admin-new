import { GetProductForContainerVm } from './product'

export type GetTemplateOfferForContainerVm = {
	templateId?: string | undefined
	templateOfferId?: string | undefined
	productId?: string | undefined
	name?: string | undefined
	sortOrder?: number
	text?: string | undefined
	price?: number
	changedDate?: string
	product?: GetProductForContainerVm
}

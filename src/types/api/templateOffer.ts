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

export type GetAllTemplateOfferVm = {
	templateId?: string
	templateOfferId?: string
	productId?: string
	name?: string
	sortOrder?: number
	text?: string
	price?: number
	changedDate?: string
}

import { GetProductForContainerVm, GetProductForTemplateVm } from './product'

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

export type GetTemplateOfferForTemplateVm = {
	templateId?: string
	templateOfferId?: string
	productId?: string
	name?: string
	sortOrder?: number
	text?: string
	price?: number
	changedDate?: string
	product?: GetProductForTemplateVm
}

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

export type UpdateTemplateTemplateOfferDto = {
	name: string
	productId: string
	sortOrder: number
	text?: string
	price: number
	templateOfferId: string
}

export type CreateTemplateOfferDto = {
	name: string
	productId: string
	sortOrder: number
	text?: string
	price: number
	templateId: string
}

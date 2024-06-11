export type GetAllProductsVm = {
	productId?: string
	changedDate?: string
	status?: number
	name?: string
	type?: number
}

export type GetProductForContainerVm = {
	productId?: string
	name?: string
}

export type GetProductForTemplateVm = {
	productId?: string
	name?: string
}

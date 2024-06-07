export type GetAllPagesVm = {
	pageId?: string | undefined
	endpointId?: number
	name?: string | undefined
	sortOrder?: number
	active?: boolean
}

export type CreatePageDto = {
	name: string
	active: boolean
	endpointId: number
}

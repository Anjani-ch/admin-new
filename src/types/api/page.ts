import { GetContainerForPage } from './container'

export type GetAllPagesVm = {
	pageId: string | undefined
	endpointId: number
	name: string | undefined
	sortOrder?: number
	active?: boolean
}

export type GetPageByKeyVm = {
	pageId: string
	endpointId: number
	name: string
	sortOrder?: number
	active?: boolean
	containers?: GetContainerForPage[]
}

export type CreatePageDto = {
	name: string
	active: boolean
	endpointId: number
}

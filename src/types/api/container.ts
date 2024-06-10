import { GetTemplateForContainerVm, GetTemplateForPage } from './template'

export type GetAllContainersVm = {
	containerId: string
	pageId: string
	name: string
	sortOrder?: number
	active?: boolean
}

export type GetContainerForPage = {
	containerId?: string
	name?: string
	sortOrder?: number
	active?: boolean
	templates?: GetTemplateForPage[]
}

export type GetContainerByKeyVm = {
	containerId?: string
	pageId?: string
	name?: string
	sortOrder?: number
	active?: boolean
	templates?: GetTemplateForContainerVm[]
}

export type CreateContainerDto = {
	name: string
	active: boolean
	pageId: string
}

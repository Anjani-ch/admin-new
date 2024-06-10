export type GetAllTemplateVm = {
	templateId: string
	containerId: string
	templateTypeId: number
	name: string
	sortOrder?: number
	active?: boolean
	header?: string
	text?: string
	logo?: string
	logo2?: string
	validToDate?: string
	limitDays?: number
	segmentation?: string
	terms?: string
	confirmText?: string
	confirmButtonText?: string
	createdDate: string
	changedDate: string
}

export type GetTemplateForPage = {
	templateId: string
}

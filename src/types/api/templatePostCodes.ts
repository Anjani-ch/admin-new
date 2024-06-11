export type CommonTemplatePostCodesVm = {
	templatePostCodesId?: string
	templateId?: string
	allowInternal?: boolean
	validPostCodesFrom?: string
	validPostCodesTo?: string
	invalidPostCodesFrom?: string
	invalidPostCodesTo?: string
}

export type UpdateTemplateTemplatePostCodesDto = {
	allowInternal?: boolean
	validPostCodesFrom?: string
	validPostCodesTo?: string
	invalidPostCodesFrom?: string
	invalidPostCodesTo?: string
}

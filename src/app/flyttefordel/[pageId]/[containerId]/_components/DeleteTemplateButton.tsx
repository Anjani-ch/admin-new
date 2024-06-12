'use client'

import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { deleteTemplateAction } from '../_actions/deleteTemplateAction'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type Props = {
	disabled: boolean
	templateId: string
	containerId: string
	pageId: string
	templateName: string
}

export default function DeleteTemplateButton({
	disabled,
	templateId,
	containerId,
	pageId,
	templateName,
}: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	return (
		<DropdownMenuItem
			disabled={disabled}
			loading={isLoading}
			onClick={async () => {
				setIsLoading(true)
				const [, err] = await deleteTemplateAction({
					templateId,
					containerId,
					pageId,
				})

				setIsLoading(false)

				if (err) {
					toast({
						title: `Feil i sletting av template ${templateName}`,
						description: err.message,
					})
					return
				}

				toast({
					title: `Vellyket`,
					description: `Template ${templateName} slettet`,
				})
			}}
		>
			Slett
		</DropdownMenuItem>
	)
}

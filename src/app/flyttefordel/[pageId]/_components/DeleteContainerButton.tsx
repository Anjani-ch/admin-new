'use client'

import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { deleteContainerAction } from '../_actions/deleteContainerActions'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type Props = {
	disabled: boolean
	containerId: string
	containerName: string
}

export default function DeletePageButton({
	disabled,
	containerId,
	containerName,
}: Props) {
	const [loading, setIsLoading] = useState(false)
	const { toast } = useToast()

	return (
		<DropdownMenuItem
			disabled={disabled || loading}
			onClick={async () => {
				setIsLoading(true)
				const [, err] = await deleteContainerAction(containerId)

				setIsLoading(false)

				if (err) {
					toast({
						title: `Feil i sletting av container ${containerName}`,
						description: err.message,
					})
					return
				}

				toast({
					title: `Vellyket`,
					description: `Container ${containerName} slettet`,
				})
			}}
		>
			Slett
		</DropdownMenuItem>
	)
}

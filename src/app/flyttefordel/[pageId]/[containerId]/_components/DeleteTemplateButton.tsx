'use client'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { deleteContainerAction } from '../_actions/deleteContainerActions'

type Props = {
	disabled: boolean
	containerId: string
	containerName: string
}

export default function DeleteTemplateButton({
	disabled,
	containerId,
	containerName,
}: Props) {
	const [loading, setIsLoading] = useState(false)
	const { toast } = useToast()

	return (
		<Button
			variant={'destructive'}
			size='icon'
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
			<Trash size={20} />
		</Button>
	)
}

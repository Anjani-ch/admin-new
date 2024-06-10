'use client'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { deletePageAction } from '../_actions/deletePageActions'
import { useState } from 'react'

type Props = {
	disabled: boolean
	pageId: string
	pageName: string
}

export default function DeletePageButton({
	disabled,
	pageId,
	pageName,
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
				const [, err] = await deletePageAction(pageId)

				setIsLoading(false)

				if (err) {
					toast({
						title: `Feil i sletting av side ${pageName}`,
						description: err.message,
					})
					return
				}

				toast({
					title: `Vellyket`,
					description: `Side ${pageName} slettet`,
				})
			}}
		>
			<Trash size={20} />
		</Button>
	)
}

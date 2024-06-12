'use client'

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { duplicateTemplateAction } from '../_actions/duplicateTemplateAction'
import { useState } from 'react'

export default function CopyTemplateButton() {
	const [isLoading, setIsLoading] = useState(false)

	const { toast } = useToast()

	const router = useRouter()
	const params = useParams()

	return (
		<Button
			type='button'
			className='w-full'
			variant='outline'
			loading={isLoading}
			onClick={async () => {
				setIsLoading(true)

				const [res, err] = await duplicateTemplateAction({
					templateId: params.templateId as string,
				})

				setIsLoading(false)

				if (!res) return

				toast({
					title: 'Vellyket',
					description: 'Template duplisert',
					action: (
						<ToastAction
							onClick={() =>
								router.push(
									`/flyttefordel/${params.pageId}/${params.containerId}/${res.newTemplateId}`
								)
							}
							altText='Åpne'
						>
							Åpne
						</ToastAction>
					),
				})
			}}
		>
			Lag kopi
		</Button>
	)
}

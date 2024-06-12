import { Button } from '@/components/ui/button'
import { deleteTemplateAction } from '../_actions/deleteTemplateAction'
import { useParams, useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

export default function DeleteTemplateButton() {
	const [isLoading, setIsLoading] = useState(false)

	const params = useParams()
	const router = useRouter()
	const { toast } = useToast()

	return (
		<Button
			type='button'
			className='w-full'
			variant='destructive'
			loading={isLoading}
			onClick={async () => {
				setIsLoading(true)

				const [, err] = await deleteTemplateAction({
					templateId: params.templateId as string,
					containerId: params.containerId as string,
					pageId: params.pageId as string,
				})

				if (err?.code === 'CONFLICT') {
					toast({
						title: 'Feil i sletting av template',
						description: err.message,
					})
					setIsLoading(false)
					return
				}

				toast({
					title: `Vellyket`,
					description: 'Template slettet',
				})

				router.push(`/flyttefordel/${params.pageId}/${params.containerId}`)
			}}
		>
			Slett
		</Button>
	)
}

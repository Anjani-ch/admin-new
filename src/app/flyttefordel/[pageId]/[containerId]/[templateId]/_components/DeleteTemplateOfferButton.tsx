'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { deleteTemplateOfferAction } from '../_actions/deleteTemplateOfferAction'

type Props = {
	templateOfferId: string
	afterDelete: () => void
}

export default function DeleteTemplateOfferButton({
	templateOfferId,
	afterDelete,
}: Props) {
	const { toast } = useToast()

	return (
		<DropdownMenuItem
			onClick={async () => {
				const [, err] = await deleteTemplateOfferAction({
					templateOfferId,
				})

				if (err) {
					toast({
						title: `Feil i sletting av tilbud`,
						description: err.message,
					})
					return
				}

				toast({
					title: `Vellyket`,
					description: 'Tilbud slettet',
				})

				afterDelete()
			}}
		>
			Slett
		</DropdownMenuItem>
	)
}

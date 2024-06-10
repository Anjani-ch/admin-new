'use client'

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import CreateTemplateForm from '@/components/form/CreateTemplateForm'

type Props = {
	pageId: string
	containerId: string
}

export default function CreateTemplateFormDialog({
	pageId,
	containerId,
}: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'sm'}
					className='flex items-center gap-3 mb-5'
				>
					<PlusCircle /> Legg til annonse
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Opprett annonse</DialogTitle>
				</DialogHeader>

				<CreateTemplateForm
					afterSubmit={() => {
						document.getElementById('closeDialog')?.click()
					}}
					pageId={pageId}
					containerId={containerId}
				/>
			</DialogContent>
		</Dialog>
	)
}

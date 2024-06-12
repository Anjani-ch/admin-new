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
import { useParams } from 'next/navigation'

export default function CreateTemplateFormDialog() {
	const params = useParams()

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
					pageId={params.pageId as string}
					containerId={params.containerId as string}
				/>
			</DialogContent>
		</Dialog>
	)
}

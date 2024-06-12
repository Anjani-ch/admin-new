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
import CreateContainerForm from '@/components/form/CreateContainerForm'
import { useParams } from 'next/navigation'

export default function CreateContainerFormDialog() {
	const params = useParams()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'sm'}
					className='flex items-center gap-3 mb-5'
				>
					<PlusCircle /> Legg til container
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Opprett container</DialogTitle>
				</DialogHeader>

				<CreateContainerForm
					afterSubmit={() => {
						document.getElementById('closeDialog')?.click()
					}}
					pageId={params.pageId as string}
				/>
			</DialogContent>
		</Dialog>
	)
}

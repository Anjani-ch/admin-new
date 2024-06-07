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

type Props = {
	pageId: string
	sortOrder: number
}

export default function CreateContainerFormDialog({
	pageId,
	sortOrder,
}: Props) {
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
					pageId={pageId}
					sortOrder={sortOrder}
				/>
			</DialogContent>
		</Dialog>
	)
}

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
import CreatePageForm from '@/components/form/CreatePageForm'
import { useState } from 'react'

export default function CreatePageFormDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'sm'}
					className='flex items-center gap-3 mb-5'
				>
					<PlusCircle /> Legg til side
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Opprett side</DialogTitle>
				</DialogHeader>

				<CreatePageForm
					afterSubmit={() => {
						document.getElementById('closeDialog')?.click()
					}}
					endpointId={1}
				/>
			</DialogContent>
		</Dialog>
	)
}

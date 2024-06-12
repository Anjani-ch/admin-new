import Combobox from '@/components/form-control/Combobox'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { GetAllContainersVm, GetContainerForPage } from '@/types/api/container'
import { GetAllPagesVm } from '@/types/api/page'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { moveTemplateAction } from '../_actions/moveTemplateAction'

type Props = {
	pages: GetAllPagesVm[]
	containers: GetAllContainersVm[]
	templateId: string
}

export default function MoveTemplateDialog({
	pages,
	containers,
	templateId,
}: Props) {
	const [selectedPage, setSelectedPage] = useState<GetAllPagesVm | null>(null)
	const [selectedContainer, setSelectedContainer] =
		useState<GetContainerForPage | null>(null)

	const router = useRouter()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type='button'
					className='w-full'
				>
					Flytt
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Flytt template</DialogTitle>
				</DialogHeader>

				<Combobox
					options={pages.map(page => ({
						label: page.name!,
						value: page.pageId,
						id: page.pageId!,
					}))}
					onSelect={option => {
						if (!option) return
						setSelectedPage(pages.find(page => page.pageId === option.id)!)
					}}
				/>

				<Combobox
					options={(selectedPage
						? containers.filter(
								container => container.pageId === selectedPage?.pageId
						  )
						: []
					).map(container => ({
						label: container.name!,
						value: container.containerId,
						id: container.containerId!,
					}))}
					onSelect={option => {
						if (!option) return
						setSelectedContainer(
							containers.find(container => container.containerId === option.id)!
						)
					}}
				/>

				<Button
					disabled={!selectedPage || !selectedContainer}
					type='button'
					onClick={async () => {
						await moveTemplateAction({
							containerId: selectedContainer!.containerId!,
							templateId,
						})

						router.push(
							`/flyttefordel/${selectedPage!.pageId!}/${selectedContainer!
								.containerId!}/${templateId}`
						)
					}}
				>
					Flytt
				</Button>
			</DialogContent>
		</Dialog>
	)
}

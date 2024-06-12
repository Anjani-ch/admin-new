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
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { moveTemplateAction } from '../_actions/moveTemplateAction'

type Props = {
	pages: GetAllPagesVm[]
	containers: GetAllContainersVm[]
}

export default function MoveTemplateDialog({ pages, containers }: Props) {
	const [selectedPage, setSelectedPage] = useState<GetAllPagesVm | null>(null)
	const [selectedContainer, setSelectedContainer] =
		useState<GetContainerForPage | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
	const params = useParams()

	return (
		<Dialog
			onOpenChange={open => {
				if (!open) {
					setSelectedPage(null)
					setSelectedContainer(null)
				}
			}}
		>
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
						setSelectedPage(pages.find(page => page.pageId === option.id)!)
						setSelectedContainer(null)
					}}
				/>

				<Combobox
					options={(selectedPage
						? containers
								.filter(
									container => container.containerId !== params.containerId
								)
								.filter(container => container.pageId === selectedPage?.pageId)
						: []
					).map(container => ({
						label: container.name!,
						value: container.containerId,
						id: container.containerId!,
					}))}
					onSelect={option => {
						setSelectedContainer(
							containers.find(container => container.containerId === option.id)!
						)
					}}
				/>

				<Button
					disabled={!selectedPage || !selectedContainer}
					loading={isLoading}
					type='button'
					onClick={async () => {
						setIsLoading(true)
						await moveTemplateAction({
							containerId: selectedContainer!.containerId!,
							templateId: params.templateId as string,
						})

						router.push(
							`/flyttefordel/${selectedPage!.pageId!}/${selectedContainer!
								.containerId!}/${params.templateId}`
						)
					}}
				>
					Flytt
				</Button>
			</DialogContent>
		</Dialog>
	)
}

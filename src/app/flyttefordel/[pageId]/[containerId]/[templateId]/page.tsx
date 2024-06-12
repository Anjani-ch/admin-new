import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getContainerById, getContainers } from '@/data-access/container'
import { getPageById, getPages } from '@/data-access/page'
import { getTemplateById } from '@/data-access/template'
import {
	getContainerByIdUseCase,
	getContainersUseCase,
} from '@/use-cases/container'
import { getPageByIdUseCase, getPagesUseCase } from '@/use-cases/page'
import { getTemplateByIdUseCase } from '@/use-cases/template'
import TemplateEditor from './_components/TemplateEditor'
import { getProductsUseCase } from '@/use-cases/product'
import { getProducts } from '@/data-access/product'
import { env } from 'next-runtime-env'

type Props = {
	params: {
		templateId: string
	}
}

export default async function Page({ params: { templateId } }: Props) {
	const template = await getTemplateByIdUseCase(
		{ getTemplateById },
		{ templateId }
	)
	const container = await getContainerByIdUseCase(
		{ getContainerById },
		{ containerId: template.containerId! }
	)
	const page = await getPageByIdUseCase(
		{ getPageById },
		{ pageId: container.pageId! }
	)
	const pages = await getPagesUseCase(
		{ getPages },
		{ endpointId: parseInt(env('FLYTTEFORDEL_FLYTTEFORDEL_ENDPOINT_ID')!) }
	)
	const containers = await getContainersUseCase({ getContainers })
	const products = await getProductsUseCase({ getProducts })

	return (
		<>
			<Breadcrumb className='hidden md:flex mb-5'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/flyttefordel'>Flyttefordel</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbLink href={`/flyttefordel/${page.pageId}`}>
							{page.name}
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbLink
							href={`/flyttefordel/${page.pageId}/${container.containerId}`}
						>
							{container.name}
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbLink
							href={`/flyttefordel/${page.pageId}/${container.containerId}/${templateId}`}
						>
							{template.name}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<TemplateEditor
				pageId={page.pageId}
				template={template}
				pages={pages.sort((a, b) => a.sortOrder! - b.sortOrder!)}
				containers={containers.sort((a, b) => a.sortOrder! - b.sortOrder!)}
				products={products.map(product => ({
					name: product.name!,
					productId: product.productId!,
				}))}
			/>
		</>
	)
}

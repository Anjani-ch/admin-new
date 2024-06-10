import { CreatePageDto, GetAllPagesVm, GetPageByKeyVm } from '@/types/api/page'
import { GetAllContainersVm } from '@/types/api/container'

export type GetPages = () => Promise<GetAllPagesVm[]>
export type GetPageById = (pageId: string) => Promise<GetPageByKeyVm>
export type CreatePage = (dto: CreatePageDto) => Promise<void>
export type DeletePageById = (pageId: string) => Promise<void>
export type GetContainers = () => Promise<GetAllContainersVm[]>

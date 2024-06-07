import { CreatePageDto, GetAllPagesVm } from '@/types/api/page'

export type GetPages = () => Promise<GetAllPagesVm[]>
export type CreatePage = (dto: CreatePageDto) => Promise<void>

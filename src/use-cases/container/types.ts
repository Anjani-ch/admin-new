import { CreateContainerDto, GetAllContainersVm } from '@/types/api/container'
import { GetAllTemplateVm } from '@/types/api/template'

export type GetContainers = () => Promise<GetAllContainersVm[]>
export type CreateContainer = (dto: CreateContainerDto) => Promise<void>
export type DeleteContainerById = (containerId: string) => Promise<void>

export type GetTemplates = () => Promise<GetAllTemplateVm[]>

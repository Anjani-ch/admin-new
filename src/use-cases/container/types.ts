import { CreateContainerDto, GetAllContainersVm } from '@/types/api/container'

export type GetContainers = () => Promise<GetAllContainersVm[]>
export type CreateContainer = (dto: CreateContainerDto) => Promise<void>

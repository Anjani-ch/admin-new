import { GetAllProductsVm } from '@/types/api/product'

export type GetProducts = () => Promise<GetAllProductsVm[]>

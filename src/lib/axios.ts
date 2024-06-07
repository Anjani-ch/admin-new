import MsalService from '@/services/MsalService'
import axios from 'axios'
import { env } from 'next-runtime-env'

const msalService = new MsalService()

export const getApiClient = async () => {
	const token = await msalService.getToken()

	return axios.create({
		baseURL: env('API_URL'),
		headers: {
			Authorization: `${token!.tokenType} ${token!.accessToken}`,
		},
	})
}

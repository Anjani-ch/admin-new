import * as msal from '@azure/msal-node'
import { env } from 'next-runtime-env'

type AccessToken = {
	accessToken: string
	tokenType: string
	expiresAt: Date
}

export default class MsalService {
	private token?: AccessToken = undefined

	async getToken() {
		if (this.token && this.token.expiresAt > new Date()) {
			return this.token
		}

		const cca = new msal.ConfidentialClientApplication({
			auth: {
				clientId: env('API_CLIENT_ID')!,
				authority: env('API_AUTHORITY')!,
				clientSecret: env('API_CLIENT_SECRET')!,
			},
		})

		const msalToken = await cca.acquireTokenByClientCredential({
			scopes: env('API_SCOPES')?.split(',')!,
		})

		this.token = {
			accessToken: msalToken!.accessToken,
			tokenType: msalToken!.tokenType,
			expiresAt: msalToken!.expiresOn!,
		}

		return this.token
	}
}

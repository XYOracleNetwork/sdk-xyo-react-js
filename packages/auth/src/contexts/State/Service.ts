export enum AuthServiceId {
  EmailPassword = 'EmailPassword',
  Web3Wallet = 'Web3Wallet',
  None = 'None',
}

export interface AuthService {
  id: AuthServiceId
  title: string
}

/** @deprecated use AuthService instead */
export type IAuthService = AuthService

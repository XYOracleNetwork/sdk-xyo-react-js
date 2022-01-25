import { AuthServiceId, IAuthService } from './AuthStateTypes'

const AuthServices: IAuthService[] = [
  {
    id: AuthServiceId.EmailPassword,
    title: 'Email and Password',
  },
  {
    id: AuthServiceId.Web3Wallet,
    title: 'Web3 wallet',
  },
]

export { AuthServiceId, AuthServices }

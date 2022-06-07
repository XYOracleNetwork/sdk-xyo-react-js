import { AuthService, AuthServiceId } from "@xyo-network/react-auth";

export const authServiceList: AuthService[] = [
  {
    id: AuthServiceId.Web3Wallet,
    title: 'Web3 wallet',
  },
  {
    id: AuthServiceId.EmailPassword,
    title: 'Email and Password',
  },
]
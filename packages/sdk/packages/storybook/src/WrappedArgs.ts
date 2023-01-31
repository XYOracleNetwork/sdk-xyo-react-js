import { AuthState } from '@xyo-network/react-auth'

export interface WrappedArgs {
  apiDomain?: string
  authState?: Partial<AuthState>
  isDarkMode?: boolean
}

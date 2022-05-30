import { AuthState} from '../packages/auth/src'

export interface WrappedArgs {
  authState?: Partial<AuthState>
  apiDomain?: string
  isDarkMode?: boolean
}
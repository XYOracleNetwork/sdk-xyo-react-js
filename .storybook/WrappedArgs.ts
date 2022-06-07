import { AuthState } from "@xyo-network/react-auth"

export interface WrappedArgs {
  authState?: Partial<AuthState>
  apiDomain?: string
  isDarkMode?: boolean
}
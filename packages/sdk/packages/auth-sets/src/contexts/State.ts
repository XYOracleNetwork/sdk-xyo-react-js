import { ContextExState } from '@xyo-network/react-shared'

export interface AuthSet<T = string> {
  default?: boolean
  token?: string
  address?: string
  networkIdentifier?: T
}

/** Name used to identify the AuthSet i.e. api domain or ip address */
type AuthSetIdentifier = string

type AuthSetMap = Map<AuthSetIdentifier, [AuthSet]>

export interface AuthSetsState extends ContextExState {
  authSets?: AuthSetMap
  activeAuthSet?: () => AuthSet | null | undefined
}

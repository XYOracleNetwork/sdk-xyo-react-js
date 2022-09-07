import { ContextExState } from '@xyo-network/react-shared'

export interface AuthSet {
  token?: string
  address?: string
  issuer?: string
  account?: string
  reAuthenticate?: boolean
}

/** Name used to identify the AuthSet i.e. api domain or ip address */
type AuthSetIdentifier = string

type AuthSetMap = Map<AuthSetIdentifier, AuthSet[]>

export interface AuthSetsState extends ContextExState {
  authSets?: AuthSetMap
  activeAuthSet?: AuthSet | null
}

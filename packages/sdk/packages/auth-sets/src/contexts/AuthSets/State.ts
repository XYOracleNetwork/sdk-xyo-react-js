import { ContextExState } from '@xyo-network/react-shared'

import { AuthSet } from './AuthSet'

/** Name used to identify the AuthSet i.e. api domain or ip address */
type AuthSetIdentifier = string

type AuthSetMap = Map<AuthSetIdentifier, AuthSet[]>

export interface AuthSetsState extends ContextExState {
  activeAuthSet?: AuthSet | null
  authSets?: AuthSetMap
  onFailure: (statusCode?: number) => void
  reAuthIssuer?: string
  removeAuthSet?: (issuer?: string) => boolean
}

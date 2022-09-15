import { ContextExState } from '@xyo-network/react-shared'

import { AuthSet } from './AuthSet'

/** Name used to identify the AuthSet i.e. api domain or ip address */
type AuthSetIdentifier = string

type AuthSetMap = Map<AuthSetIdentifier, AuthSet[]>

export interface AuthSetsState extends ContextExState {
  authSets?: AuthSetMap
  activeAuthSet?: AuthSet | null
  removeAuthSet?: (issuer?: string) => boolean
  reAuthIssuer?: string
  onFailure: (statusCode?: number) => void
}

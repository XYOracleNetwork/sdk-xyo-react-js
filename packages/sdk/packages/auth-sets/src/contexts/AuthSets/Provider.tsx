import { WithChildren } from '@xylabs/react-shared'
import { useAuthState } from '@xyo-network/react-auth'
import { useEffect } from 'react'

import { AuthSetsContext } from './Context'
import { useAuthSetsMethods } from './hooks'
import { AuthSetsState } from './State'

export interface AuthSetsProviderProps extends WithChildren {
  defaultAuthSets?: AuthSetsState['authSets']
  activeIssuer?: string
  issuerMapping?: Record<string, string>
  persist?: boolean
}

export const AuthSetsProvider: React.FC<AuthSetsProviderProps> = ({
  defaultAuthSets = new Map(),
  activeIssuer,
  issuerMapping,
  persist = true,
  children,
}) => {
  const { updateAuthSet, removeAuthSet, authSets, activeAuthSet, markForReAuthenticate } = useAuthSetsMethods({
    activeIssuer,
    defaultAuthSets,
    persist,
  })
  const { state: authState } = useAuthState()

  // Watch for authState changes
  useEffect(() => {
    if (authState) {
      const { jwtToken, issuer, loggedInAccount, reAuthenticate } = authState
      // New Login
      updateAuthSet(jwtToken, issuer, loggedInAccount, issuer ? issuerMapping?.[issuer] : undefined)

      if (reAuthenticate) {
        markForReAuthenticate()
      }
    }
  }, [authState, issuerMapping, updateAuthSet, markForReAuthenticate])

  return <AuthSetsContext.Provider value={{ activeAuthSet, authSets, provided: true, removeAuthSet }}>{children}</AuthSetsContext.Provider>
}

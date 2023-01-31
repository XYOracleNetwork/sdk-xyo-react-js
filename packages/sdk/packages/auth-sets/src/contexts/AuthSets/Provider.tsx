import { WithChildren } from '@xylabs/react-shared'
import { useAuthState } from '@xyo-network/react-auth'
import { useCallback, useEffect, useState } from 'react'

import { AuthSetsContext } from './Context'
import { useAuthSetsMethods } from './hooks'
import { AuthSetsState } from './State'

export interface AuthSetsProviderProps extends WithChildren {
  activeIssuer?: string
  defaultAuthSets?: AuthSetsState['authSets']
  defaultReAuthIssuer?: string
  issuerMapping?: Record<string, string>
  persist?: boolean
}

export const AuthSetsProvider: React.FC<AuthSetsProviderProps> = ({
  activeIssuer,
  children,
  defaultAuthSets = new Map(),
  defaultReAuthIssuer,
  issuerMapping,
  persist = true,
}) => {
  const { addAuthSet, removeAuthSet, authSets, activeAuthSet, onFailure } = useAuthSetsMethods({
    activeIssuer,
    defaultAuthSets,
    persist,
  })
  const [reAuthIssuer, setReAuthIssuer] = useState<string | undefined>(defaultReAuthIssuer)
  const { state: authState } = useAuthState()

  const updateReAuthIssuer = useCallback(
    (reAuthenticate?: boolean, issuer?: string) => {
      if (reAuthIssuer !== issuer) {
        setReAuthIssuer(reAuthenticate ? issuer : undefined)
      }
    },
    [reAuthIssuer],
  )

  // Watch for authState changes
  useEffect(() => {
    if (authState) {
      const { jwtToken, issuer, loggedInAccount, reAuthenticate } = authState
      if (!reAuthenticate) {
        // New Login
        addAuthSet(jwtToken, issuer, loggedInAccount, issuer ? issuerMapping?.[issuer] : undefined)
      }
      updateReAuthIssuer(reAuthenticate, issuer)
    }
  }, [addAuthSet, authState, issuerMapping, reAuthIssuer, updateReAuthIssuer])

  return (
    <AuthSetsContext.Provider value={{ activeAuthSet, authSets, onFailure, provided: true, reAuthIssuer, removeAuthSet }}>
      {children}
    </AuthSetsContext.Provider>
  )
}

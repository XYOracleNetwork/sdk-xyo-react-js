import { WithChildren } from '@xylabs/react-shared'
import { useAuthState } from '@xyo-network/react-auth'
import { useEffect, useState } from 'react'

import { AuthSetsContext } from './Context'
import { useAuthSetsMethods } from './hooks'
import { AuthSetsState } from './State'

export interface AuthSetsProviderProps extends WithChildren {
  defaultAuthSets?: AuthSetsState['authSets']
  defaultReAuthIssuer?: string
  activeIssuer?: string
  issuerMapping?: Record<string, string>
  persist?: boolean
}

export const AuthSetsProvider: React.FC<AuthSetsProviderProps> = ({
  defaultAuthSets = new Map(),
  defaultReAuthIssuer,
  activeIssuer,
  issuerMapping,
  persist = true,
  children,
}) => {
  const { updateAuthSet, removeAuthSet, authSets, activeAuthSet } = useAuthSetsMethods({
    activeIssuer,
    defaultAuthSets,
    persist,
  })
  const [reAuthIssuer, setReAuthIssuer] = useState<string | undefined>(defaultReAuthIssuer)
  const { state: authState } = useAuthState()

  // Watch for authState changes
  useEffect(() => {
    if (authState) {
      const { jwtToken, issuer, loggedInAccount, reAuthenticate } = authState
      // New Login
      updateAuthSet(jwtToken, issuer, loggedInAccount, issuer ? issuerMapping?.[issuer] : undefined)

      if (reAuthenticate && reAuthIssuer !== issuer) {
        setReAuthIssuer(issuer)
      } else if (!reAuthenticate && reAuthIssuer !== issuer) {
        setReAuthIssuer(undefined)
      }
    }
  }, [authState, issuerMapping, reAuthIssuer, updateAuthSet])

  return (
    <AuthSetsContext.Provider value={{ activeAuthSet, authSets, provided: true, reAuthIssuer, removeAuthSet }}>{children}</AuthSetsContext.Provider>
  )
}

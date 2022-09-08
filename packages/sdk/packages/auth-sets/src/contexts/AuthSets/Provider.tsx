import { WithChildren } from '@xylabs/react-shared'
import { AuthActionType, useAuthState } from '@xyo-network/react-auth'
import { useEffect, useMemo, useState } from 'react'

import { AuthSet } from './AuthSet'
import { AuthSetsContext } from './Context'
import { AuthSetsState } from './State'

export interface AuthSetsProviderProps extends WithChildren {
  defaultAuthSets?: AuthSetsState['authSets']
  activeIssuer?: string
  issuerMapping?: Record<string, string>
}

export const AuthSetsProvider: React.FC<AuthSetsProviderProps> = ({ defaultAuthSets = new Map(), activeIssuer, issuerMapping, children }) => {
  const { state: authState, dispatch: setAuthState } = useAuthState()

  const [authSets, setAuthSets] = useState<AuthSetsState['authSets']>(defaultAuthSets)

  // Watch for network changes
  useEffect(() => {
    if (activeIssuer) {
      // Reset AuthState since the network changed
      setAuthState?.({ payload: {}, type: AuthActionType.Logout })
    }
  }, [activeIssuer, setAuthState])

  // Watch for authState changes
  useEffect(() => {
    if (authState) {
      const { jwtToken, issuer, loggedInAccount } = authState
      // New Login
      if (jwtToken && issuer && loggedInAccount) {
        const authSet: AuthSet = {
          account: loggedInAccount,
          address: '',
          identifier: issuerMapping?.[issuer],
          issuer,
          token: authState?.jwtToken,
        }
        // multiple authSets per identifier may exist in the future
        // but for now we only have one per identifier
        setAuthSets((previous) => new Map(previous?.set(issuer, [authSet])))
        return
      }
    }
  }, [authState, issuerMapping])

  const activeAuthSet = useMemo(() => (activeIssuer ? authSets?.get(activeIssuer)?.[0] : null), [authSets, activeIssuer])

  return <AuthSetsContext.Provider value={{ activeAuthSet, authSets, provided: true }}>{children}</AuthSetsContext.Provider>
}

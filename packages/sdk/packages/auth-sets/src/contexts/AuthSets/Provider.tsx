import { WithChildren } from '@xylabs/react-shared'
import { useAuthState } from '@xyo-network/react-auth'
import { useEffect, useMemo } from 'react'

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
  const { addAuthSet, removeAuthSet, authSets } = useAuthSetsMethods({ activeIssuer, defaultAuthSets, persist })
  const { state: authState } = useAuthState()

  // Watch for network changes
  /**
   * Only needed to ensure that authState serializes the current authSet values correctly.
   * I.e. if we go from beta to main, then we need to make sure that beta credentials don't
   * end up in localStorage anymore.  Possible plan, serialize authSets (namespaced) and
   * bring them back on load.  Update AuthState based on de-serialized results. Remove
   * serialization from authContext.
   **/

  // useEffect(() => {
  //   if (activeIssuer) {
  //     // Reset AuthState since the network changed
  //     setAuthState?.({ payload: {}, type: AuthActionType.Logout })
  //   }
  // }, [activeIssuer, setAuthState])

  // Watch for authState changes
  useEffect(() => {
    if (authState) {
      const { jwtToken, issuer, loggedInAccount } = authState
      // New Login
      addAuthSet(jwtToken, issuer, loggedInAccount, issuer ? issuerMapping?.[issuer] : undefined)
    }
  }, [authState, issuerMapping, addAuthSet])

  const activeAuthSet = useMemo(() => (activeIssuer ? authSets?.get(activeIssuer)?.[0] : null), [authSets, activeIssuer])

  return <AuthSetsContext.Provider value={{ activeAuthSet, authSets, provided: true, removeAuthSet }}>{children}</AuthSetsContext.Provider>
}

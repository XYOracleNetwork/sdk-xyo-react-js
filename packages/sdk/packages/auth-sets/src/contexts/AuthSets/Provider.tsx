import { WithChildren } from '@xylabs/react-shared'
import { AuthActionType, useAuthState } from '@xyo-network/react-auth'
import { useNetwork } from '@xyo-network/react-network'
import { useEffect, useMemo, useState } from 'react'

import { AuthSetsContext } from './Context'
import { AuthSet, AuthSetsState } from './State'

export interface AuthSetsProviderProps extends WithChildren {
  defaultAuthSets: AuthSetsState['authSets']
}

export const AuthSetsProvider: React.FC<AuthSetsProviderProps> = ({ defaultAuthSets = new Map(), children }) => {
  const { network } = useNetwork()
  const { state: authState, dispatch: setAuthState } = useAuthState()

  const [authSets, setAuthSets] = useState<AuthSetsState['authSets']>(defaultAuthSets)
  const [activeAuthSetId, setActiveAuthSetId] = useState<string>()

  // Watch for network changes
  useEffect(() => {
    if (network) {
      const activeNode = network?.nodes?.find((node) => node.type === 'archivist')
      const apiDomain = activeNode?.uri
      setActiveAuthSetId(apiDomain)
      // Reset AuthState since the network changed
      setAuthState?.({ payload: {}, type: AuthActionType.Logout })
    }
  }, [network, setAuthState])

  // Watch for authState changes
  useEffect(() => {
    if (authState) {
      const { jwtToken, issuer, loggedInAccount } = authState
      // New Login
      if (jwtToken && issuer && loggedInAccount) {
        const authSet: AuthSet = {
          account: loggedInAccount,
          address: '',
          issuer,
          token: authState?.jwtToken,
        }
        // multiple authSets per identifier may exist in the future
        // but for now we only have one per identifier
        setAuthSets((previous) => new Map(previous?.set(issuer, [authSet])))
        return
      }
    }
  }, [authState])

  const activeAuthSet = useMemo(() => (activeAuthSetId ? authSets?.get(activeAuthSetId)?.[0] : null), [authSets, activeAuthSetId])

  return <AuthSetsContext.Provider value={{ activeAuthSet, authSets, provided: true }}>{children}</AuthSetsContext.Provider>
}

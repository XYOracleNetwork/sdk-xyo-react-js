import { WithChildren } from '@xylabs/react-shared'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { useAuthState } from '@xyo-network/react-auth'
import { useNetwork } from '@xyo-network/react-network'
import { useCallback, useEffect, useState } from 'react'

import { AuthSetsContext } from './Context'
import { AuthSet, AuthSetsState } from './State'

export const AuthSetsProvider: React.FC<WithChildren> = ({ children }) => {
  const { network } = useNetwork()
  const { state: authState } = useAuthState()
  const { api } = useArchivistApi()

  const [authSets, setAuthSets] = useState<AuthSetsState['authSets']>(new Map())
  const [activeAuthSetId, setActiveAuthSetId] = useState<string>()

  const updateAuthSets = useCallback(
    (authSetId: string, newAuthSets: [AuthSet]) => {
      if (authSets) {
        setAuthSets(new Map(authSets.set(authSetId, newAuthSets)))
        setActiveAuthSetId(authSetId)
      }
    },
    [authSets],
  )

  useEffect(() => {
    if (network && authState && api) {
      const activeAuthSetIdentifier = network.nodes?.find((node) => node.uri === window.location.origin)?.name
      const apiDomain = api.config.apiDomain

      const authSet: AuthSet = {
        address: '',
        default: true,
        networkIdentifier: activeAuthSetIdentifier,
        token: authState.jwtToken,
      }

      // multiple authSets per identifier may exist in the future
      // but for now we only have one per identifier
      updateAuthSets(apiDomain, [authSet])
    }
  }, [network, authState, api, updateAuthSets])

  const activeAuthSet = () => {
    if (activeAuthSetId && authSets) {
      const result = authSets?.get(activeAuthSetId)
      return result ? result[0] : null
    } else {
      return undefined
    }
  }

  return <AuthSetsContext.Provider value={{ activeAuthSet, authSets, provided: true }}>{children}</AuthSetsContext.Provider>
}

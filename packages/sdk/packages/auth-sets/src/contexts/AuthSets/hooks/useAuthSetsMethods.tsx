import { AuthActionType, useAuthState } from '@xyo-network/react-auth'
import { useCallback, useState } from 'react'

import { AuthSet } from '../AuthSet'
import { AuthSetsState } from '../State'

export const AuthSetsLocalStorageKey = 'XyoAuthSets'

const resolveInitialAuthSets = (defaultAuthSets?: AuthSetsState['authSets'], persist?: boolean) => {
  if (defaultAuthSets && defaultAuthSets.size > 0) {
    return new Map(defaultAuthSets)
  } else if (persist) {
    const savedSets = localStorage.getItem(AuthSetsLocalStorageKey)
    if (savedSets) {
      try {
        const sets: [[string, AuthSet[]]] = JSON.parse(savedSets)
        return new Map(sets)
      } catch (e) {
        console.error('unable to de-serialize saved authSets', e)
        return
      }
    } else {
      return new Map(defaultAuthSets)
    }
  }
}

interface UseAuthSetsMethodsConfig {
  defaultAuthSets?: AuthSetsState['authSets']
  activeIssuer?: string
  persist?: boolean
}

export const useAuthSetsMethods = ({ defaultAuthSets, activeIssuer, persist = true }: UseAuthSetsMethodsConfig) => {
  const [authSets, setAuthSets] = useState<AuthSetsState['authSets']>(() => resolveInitialAuthSets(defaultAuthSets, persist))
  const { dispatch: setAuthState } = useAuthState()

  const addAuthSet = useCallback(
    (token?: string, issuer?: string, account?: string | null, identifier?: string) => {
      if (token && issuer && account) {
        const authSet: AuthSet = {
          account,
          address: '',
          identifier,
          issuer,
          schema: 'network.xyo.authset',
          token,
        }
        // multiple authSets per identifier may exist in the future
        // but for now we only have one per identifier
        setAuthSets((previous) => {
          const newSets = new Map(previous?.set(issuer, [authSet]))
          if (persist) {
            localStorage.setItem(AuthSetsLocalStorageKey, JSON.stringify(Array.from(newSets)))
          }
          return newSets
        })
      }
    },
    [persist],
  )

  const removeAuthSet = (issuer?: string) => {
    if (!issuer) {
      return false
    }

    const removed = authSets?.delete(issuer)
    if (removed) {
      setAuthSets(new Map(authSets))
      if (issuer === activeIssuer) {
        // Logout when removing authSet that maps to current issuer
        setAuthState?.({ payload: {}, type: AuthActionType.Logout })
      }
      return true
    } else {
      return false
    }
  }

  return { addAuthSet, authSets, removeAuthSet, resolveInitialAuthSets, setAuthSets }
}

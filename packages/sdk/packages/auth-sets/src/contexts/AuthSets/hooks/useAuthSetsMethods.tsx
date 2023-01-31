import { AuthActionType, useAuthState } from '@xyo-network/react-auth'
import { useCallback, useMemo, useState } from 'react'

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
  activeIssuer?: string
  defaultAuthSets?: AuthSetsState['authSets']
  persist?: boolean
}

export const useAuthSetsMethods = ({ defaultAuthSets, activeIssuer, persist = true }: UseAuthSetsMethodsConfig) => {
  const [authSets, setAuthSets] = useState<AuthSetsState['authSets']>(() => resolveInitialAuthSets(defaultAuthSets, persist))
  const { state: authState, dispatch: setAuthState } = useAuthState()
  const activeAuthSet = useMemo(() => (activeIssuer ? authSets?.get(activeIssuer)?.[0] : null), [authSets, activeIssuer])

  const updateLocalStorage = (authSets?: AuthSetsState['authSets'], persist?: boolean) => {
    if (authSets && persist) {
      localStorage.setItem(AuthSetsLocalStorageKey, JSON.stringify(Array.from(authSets)))
    }
  }

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
          updateLocalStorage(newSets, persist)
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
      const newSets = new Map(authSets)
      setAuthSets(newSets)
      if (issuer === activeIssuer) {
        // Logout when removing authSet that maps to current issuer
        setAuthState?.({ payload: {}, type: AuthActionType.Logout })
      }
      updateLocalStorage(newSets, persist)
      return true
    } else {
      return false
    }
  }

  const onFailure = useCallback(
    (statusCode?: number) => {
      if (statusCode === 401 && authState?.reAuthenticate === false) {
        setAuthState?.({ payload: { issuer: activeIssuer, reAuthenticate: true }, type: AuthActionType.Logout })
      }
    },
    [activeIssuer, authState?.reAuthenticate, setAuthState],
  )

  return { activeAuthSet, addAuthSet, authSets, onFailure, removeAuthSet, resolveInitialAuthSets, setAuthSets }
}

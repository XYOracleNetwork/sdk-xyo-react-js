import { useRenderSpinCheck } from '@xylabs/react-render-spin-check'
import { AccountInstance } from '@xyo-network/account-model'
import { Logger } from '@xyo-network/core'
import { ConstructableModuleWrapper, ModuleWrapper } from '@xyo-network/module'
import { useAccount } from '@xyo-network/react-wallet'
import compact from 'lodash/compact'
import { useEffect, useMemo, useState } from 'react'

import { useModules } from './useModules'

export const WrappedModulesHookFactory = <TModuleWrapper extends ModuleWrapper>(
  wrapperObject: ConstructableModuleWrapper<TModuleWrapper>,
  name?: string,
) => {
  const filter = {
    query: [wrapperObject.requiredQueries],
  }
  const useHook = (account?: AccountInstance, spinCheck?: boolean, logger?: Logger): [TModuleWrapper[] | undefined, Error | undefined] => {
    const spinCheckBounceNoCheck = useMemo(() => {
      return { name: name ?? 'WrappedModulesHookFactory-NoCheck' }
    }, [])
    useRenderSpinCheck(spinCheck ? { name: name ?? 'WrappedModuleHookFactory' } : spinCheckBounceNoCheck)
    const [providedAccount] = useAccount()
    const [modules, moduleError] = useModules<TModuleWrapper['module']>(filter, logger)

    const [wrappers, setWrappers] = useState<TModuleWrapper[]>()
    const [error, setError] = useState<Error>()

    const accountToUse = useMemo(() => account ?? providedAccount, [account, providedAccount])

    useEffect(() => {
      if (!accountToUse) {
        logger?.debug('useEffect: accountToUse')
        const error = Error('Module hooks require either an Account context or account parameter')
        //console.error(error.message)
        setError(error)
      }
    }, [accountToUse, logger])

    useEffect(() => {
      if (modules && accountToUse) {
        try {
          const wrappers = compact(modules?.map((module) => wrapperObject.tryWrap(module, accountToUse)))
          logger?.debug('useEffect: modules && accountToUse')
          setWrappers(wrappers)
          setError(undefined)
        } catch (ex) {
          logger?.error(`useEffect: modules && accountToUse Error: ${(ex as Error).message}`)
          setWrappers(undefined)
          setError(ex as Error)
        }
      } else {
        logger?.debug('useEffect: no modules && accountToUse')
        setWrappers(undefined)
        setError(moduleError)
      }
      return () => {
        logger?.debug('useEffect: modules && accountToUse unmount')
      }
    }, [modules, account, moduleError, accountToUse, logger])

    return [wrappers, error]
  }
  return useHook
}

export const useWrappedModules = WrappedModulesHookFactory(ModuleWrapper, 'useWrappedModules')

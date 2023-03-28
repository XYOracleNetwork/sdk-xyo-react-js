import { useRenderSpinCheck } from '@xylabs/react-render-spin-check'
import { AccountInstance } from '@xyo-network/account-model'
import { ConstructableModuleWrapper, ModuleWrapper } from '@xyo-network/module'
import { useAccount } from '@xyo-network/react-wallet'
import compact from 'lodash/compact'
import { useEffect, useMemo, useState } from 'react'

import { useModules } from './useModules'

export const WrappedModulesHookFactory = <TModuleWrapper extends ModuleWrapper>(
  wrapperObject: ConstructableModuleWrapper<TModuleWrapper>,
  name?: string,
) => {
  const useHook = (account?: AccountInstance, spinCheck?: boolean): [TModuleWrapper[] | undefined, Error | undefined] => {
    const spinCheckBounceNoCheck = useMemo(() => {
      return { name: name ?? 'WrappedModulesHookFactory-NoCheck' }
    }, [])
    useRenderSpinCheck(spinCheck ? { name: name ?? 'WrappedModuleHookFactory' } : spinCheckBounceNoCheck)
    const [providedAccount] = useAccount()
    const [modules, moduleError] = useModules<TModuleWrapper['module']>({
      query: [wrapperObject.requiredQueries],
    })

    const [wrappers, setWrappers] = useState<TModuleWrapper[]>()
    const [error, setError] = useState<Error>()

    const accountToUse = useMemo(() => account ?? providedAccount, [account, providedAccount])

    useEffect(() => {
      if (!accountToUse) {
        const error = Error('Module hooks require either an Account context or account parameter')
        //console.error(error.message)
        setError(error)
      }
    }, [accountToUse])

    useEffect(() => {
      if (modules && accountToUse) {
        try {
          const wrappers = compact(modules?.map((module) => wrapperObject.tryWrap(module, accountToUse)))
          setWrappers(wrappers)
          setError(undefined)
        } catch (ex) {
          setWrappers(undefined)
          setError(ex as Error)
        }
      } else {
        setWrappers(undefined)
        setError(moduleError)
      }
    }, [modules, account, moduleError, accountToUse])

    return [wrappers, error]
  }
  return useHook
}

export const useWrappedModules = WrappedModulesHookFactory(ModuleWrapper, 'useWrappedModules')

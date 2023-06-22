import { Logger } from '@xyo-network/core'
import { ConstructableModuleWrapper, ModuleWrapper } from '@xyo-network/module'
import { useAccount } from '@xyo-network/react-wallet'
import { WalletInstance } from '@xyo-network/wallet-model'
import compact from 'lodash/compact'
import { useEffect, useState } from 'react'

import { useModules } from './useModules'

export const WrappedModulesHookFactory = <TModuleWrapper extends ModuleWrapper>(
  wrapperObject: ConstructableModuleWrapper<TModuleWrapper>,
  name: string,
) => {
  const filter = {
    query: [wrapperObject.requiredQueries],
  }
  const useHook = (account?: WalletInstance, logger?: Logger): [TModuleWrapper[] | undefined, Error | undefined] => {
    logger?.debug(`Render: ${name}`)

    const [accountToUse] = useAccount({ account })
    const [modules, moduleError] = useModules<TModuleWrapper['module']>(filter, logger)

    const [wrappers, setWrappers] = useState<TModuleWrapper[]>()
    const [error, setError] = useState<Error>()

    useEffect(() => {
      logger?.debug('useEffect: accountToUse start')
      if (!accountToUse) {
        logger?.debug('useEffect: accountToUse')
        const error = Error('Module hooks require either an Account context or account parameter')
        //console.error(error.message)
        setError(error)
      }
    }, [accountToUse, logger])

    useEffect(() => {
      logger?.debug('useEffect: modules && accountToUse start')
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
    }, [modules, moduleError, accountToUse, logger])

    return [wrappers, error]
  }
  return useHook
}

export const useWrappedModules = WrappedModulesHookFactory(ModuleWrapper, 'useWrappedModules')

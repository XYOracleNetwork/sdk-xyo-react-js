import { Logger } from '@xyo-network/core'
import { ConstructableModuleWrapper, ModuleWrapper } from '@xyo-network/module'
import { useAccount } from '@xyo-network/react-wallet'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

import { useModule } from './useModule'

export const WrappedModuleHookFactory = <TModuleWrapper extends ModuleWrapper>(
  wrapperObject: ConstructableModuleWrapper<TModuleWrapper>,
  name?: string,
) => {
  const useHook = (nameOrAddress?: string, account?: WalletInstance, logger?: Logger): [TModuleWrapper | undefined, Error | undefined] => {
    logger?.debug(`Render: ${name}`)
    const [accountToUse] = useAccount({ account })
    const [module, moduleError] = useModule<TModuleWrapper['module']>(
      nameOrAddress ?? {
        query: [wrapperObject.requiredQueries],
      },
      account,
      logger,
    )

    const [wrapper, setWrapper] = useState<TModuleWrapper>()
    const [error, setError] = useState<Error>()

    useEffect(() => {
      if (!accountToUse) {
        const error = Error('Module hooks require either an Account context or account parameter')
        //console.error(error.message)
        setError(error)
      }
    }, [accountToUse])

    useEffect(() => {
      if (module && accountToUse) {
        try {
          const wrapper = wrapperObject.wrap(module, accountToUse)
          setWrapper(wrapper)
          setError(undefined)
        } catch (ex) {
          setWrapper(undefined)
          setError(ex as Error)
        }
      } else {
        setWrapper(undefined)
        setError(moduleError)
      }
    }, [module, account, moduleError, accountToUse])

    return [wrapper, error]
  }
  return useHook
}

export const useWrappedModule = WrappedModuleHookFactory(ModuleWrapper, 'useWrappedModule')

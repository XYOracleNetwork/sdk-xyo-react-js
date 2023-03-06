/* eslint-disable react-hooks/rules-of-hooks */
import { AccountInstance } from '@xyo-network/account-model'
import { ModuleWrapper } from '@xyo-network/module'
import { useAccount } from '@xyo-network/react-wallet'
import { useEffect, useMemo, useState } from 'react'

import { useModule } from './useModule'

export interface WrapperStatic<TModuleWrapper extends ModuleWrapper = ModuleWrapper> {
  requiredQueries: string[]
  wrap: (module?: TModuleWrapper['module'], account?: AccountInstance) => TModuleWrapper
}

export const WrappedModuleHookFactory = <TModuleWrapper extends ModuleWrapper = ModuleWrapper>(wrapperObject: WrapperStatic<TModuleWrapper>) => {
  return (nameOrAddress?: string, account?: AccountInstance): [TModuleWrapper | undefined, Error | undefined] => {
    const [providedAccount] = useAccount()
    const [module, moduleError] = useModule<TModuleWrapper['module']>(
      nameOrAddress ?? {
        query: [wrapperObject.requiredQueries],
      },
    )

    const [wrapper, setWrapper] = useState<TModuleWrapper>()
    const [error, setError] = useState<Error>()

    const accountToUse = useMemo(() => account ?? providedAccount, [account, providedAccount])

    if (!accountToUse) {
      const error = Error('Module hooks require either an Account context or account parameter')
      console.error(error.message)
      setError(error)
    }

    useEffect(() => {
      if (module && accountToUse) {
        try {
          const wrapper = wrapperObject.wrap(module, accountToUse) as TModuleWrapper
          setWrapper(wrapper)
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
}

export const useWrappedModule = WrappedModuleHookFactory(ModuleWrapper)

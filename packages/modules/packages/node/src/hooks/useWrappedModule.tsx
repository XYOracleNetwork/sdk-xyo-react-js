import { RenderSpinCheckConfig, useRenderSpinCheck } from '@xylabs/react-render-spin-check'
import { AccountInstance } from '@xyo-network/account-model'
import { ConstructableModuleWrapper, ModuleWrapper } from '@xyo-network/module'
import { useAccount } from '@xyo-network/react-wallet'
import { useEffect, useMemo, useState } from 'react'

import { useModule } from './useModule'

export const WrappedModuleHookFactory = <TModuleWrapper extends ModuleWrapper>(
  wrapperObject: ConstructableModuleWrapper<TModuleWrapper>,
  name?: string,
) => {
  const useHook = (
    nameOrAddress?: string,
    account?: AccountInstance,
    spinCheck?: boolean | RenderSpinCheckConfig,
  ): [TModuleWrapper | undefined, Error | undefined] => {
    const spinCheckBounceNoCheck = useMemo(() => {
      return { name: name ?? 'WrappedModuleHookFactory-NoCheck' }
    }, [])
    useRenderSpinCheck(
      spinCheck ? { name: name ?? 'WrappedModuleHookFactory' } : spinCheckBounceNoCheck,
      typeof spinCheck === 'object' ? spinCheck : undefined,
    )
    const [providedAccount] = useAccount()
    const [module, moduleError] = useModule<TModuleWrapper['module']>(
      nameOrAddress ?? {
        query: [wrapperObject.requiredQueries],
      },
    )

    const [wrapper, setWrapper] = useState<TModuleWrapper>()
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

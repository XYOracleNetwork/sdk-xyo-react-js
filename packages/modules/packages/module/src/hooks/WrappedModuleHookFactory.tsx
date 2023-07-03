import { AccountInstance } from '@xyo-network/account-model'
import { Logger } from '@xyo-network/core'
import { ConstructableModuleWrapper, ModuleWrapper } from '@xyo-network/module'
import { useWrapperAccount } from '@xyo-network/react-wallet'
import { useEffect, useState } from 'react'

export const WrappedModuleHookFactory = {
  create: <TModuleWrapper extends ModuleWrapper>(wrapperObject: ConstructableModuleWrapper<TModuleWrapper>, name?: string) => {
    const useHook = (
      module?: TModuleWrapper['module'],
      account?: AccountInstance,
      logger?: Logger,
    ): [TModuleWrapper | undefined, Error | undefined] => {
      logger?.debug(`Render: ${name}`)
      const [wrapperAccount] = useWrapperAccount()

      const [wrapper, setWrapper] = useState<TModuleWrapper>()
      const [error, setError] = useState<Error>()

      useEffect(() => {
        const walletToUse = account || wrapperAccount
        if (module && walletToUse) {
          try {
            const wrapper = wrapperObject.wrap(module, walletToUse)
            setWrapper(wrapper)
            setError(undefined)
          } catch (ex) {
            setWrapper(undefined)
            setError(ex as Error)
          }
        } else {
          setWrapper(undefined)
          setError(undefined)
        }
      }, [module, account, wrapperAccount])

      return [wrapper, error]
    }
    return useHook
  },
}

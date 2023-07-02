import { AccountInstance } from '@xyo-network/account-model'
import { Logger } from '@xyo-network/core'
import { ConstructableModuleWrapper, ModuleWrapper } from '@xyo-network/module'
import { useWrapperAccount } from '@xyo-network/react-wallet'
import { useEffect, useState } from 'react'

export const WrappedModulesHookFactory = {
  create: <TModuleWrapper extends ModuleWrapper>(wrapperObject: ConstructableModuleWrapper<TModuleWrapper>, name?: string) => {
    const useHook = (
      modules?: TModuleWrapper['module'][],
      account?: AccountInstance,
      logger?: Logger,
    ): [TModuleWrapper[] | undefined, Error | undefined] => {
      logger?.debug(`Render: ${name}`)
      const wrapperAccount = useWrapperAccount()

      const [wrappers, setWrappers] = useState<TModuleWrapper[]>()
      const [error, setError] = useState<Error>()

      useEffect(() => {
        const walletToUse = account || wrapperAccount
        if (module && walletToUse) {
          try {
            const wrappers = modules?.map((module) => wrapperObject.wrap(module, walletToUse))
            setWrappers(wrappers)
            setError(undefined)
          } catch (ex) {
            setWrappers(undefined)
            setError(ex as Error)
          }
        } else {
          setWrappers(undefined)
          setError(undefined)
        }
      }, [modules, account, wrapperAccount])

      return [wrappers, error]
    }
    return useHook
  },
}

import { Logger } from '@xyo-network/core'
import { ConstructableModuleWrapper, ModuleWrapper } from '@xyo-network/module'
import { useWallet } from '@xyo-network/react-wallet'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useMemo, useState } from 'react'

import { useModuleFromNode } from '../useModuleFromNode'
import { useModulesFromNode } from '../useModulesFromNode'

export const WrappedModuleFromNodeHookFactory = {
  create: <TModuleWrapper extends ModuleWrapper>(wrapperObject: ConstructableModuleWrapper<TModuleWrapper>, name?: string) => {
    const useHook = (
      nameOrAddress?: string,
      wallet?: WalletInstance,
      up?: boolean,
      logger?: Logger,
    ): [TModuleWrapper | undefined, Error | undefined] => {
      logger?.debug(`Render: ${name}`)
      const [walletToUse] = useWallet({ wallet })
      const [module, moduleError] = useModuleFromNode<TModuleWrapper['module']>(nameOrAddress, up, logger)

      const [modules, modulesError] = useModulesFromNode<TModuleWrapper['module']>(
        {
          query: [wrapperObject.requiredQueries],
        },
        up,
        logger,
      )

      const [wrapper, setWrapper] = useState<TModuleWrapper>()
      const [error, setError] = useState<Error>()

      const activeModule = useMemo(() => module ?? modules?.[0], [module, modules])

      /*
    useEffect(() => {
      if (!walletToUse) {
        const error = Error('Module hooks require either an Account context or account parameter')
        //console.error(error.message)
        setError(error)
      }
    }, [walletToUse])
    */

      useEffect(() => {
        if (activeModule && walletToUse) {
          try {
            const wrapper = wrapperObject.wrap(activeModule, walletToUse)
            setWrapper(wrapper)
            setError(undefined)
          } catch (ex) {
            setWrapper(undefined)
            setError(ex as Error)
          }
        } else {
          setWrapper(undefined)
          setError(moduleError ?? modulesError)
        }
      }, [activeModule, wallet, moduleError, walletToUse, modulesError])

      return [wrapper, error]
    }
    return useHook
  },
}

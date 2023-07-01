import { Logger } from '@xyo-network/core'
import { ConstructableModuleWrapper, Module, ModuleWrapper } from '@xyo-network/module'
import { useWrapperWallet } from '@xyo-network/react-wallet'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

export const WrappedModuleHookFactory = <TModuleWrapper extends ModuleWrapper>(
  wrapperObject: ConstructableModuleWrapper<TModuleWrapper>,
  name?: string,
) => {
  const useHook = (module?: Module, wallet?: WalletInstance, logger?: Logger): [TModuleWrapper | undefined, Error | undefined] => {
    logger?.debug(`Render: ${name}`)
    const wrapperWallet = useWrapperWallet()

    const [wrapper, setWrapper] = useState<TModuleWrapper>()
    const [error, setError] = useState<Error>()

    useEffect(() => {
      const walletToUse = wallet || wrapperWallet
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
    }, [module, wallet, wrapperWallet])

    return [wrapper, error]
  }
  return useHook
}

export const useWrappedModule = WrappedModuleHookFactory(ModuleWrapper, 'useWrappedModule')

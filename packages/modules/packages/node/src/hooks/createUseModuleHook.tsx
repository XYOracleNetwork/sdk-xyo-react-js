/* eslint-disable react-hooks/rules-of-hooks */
import { useAsyncEffect } from '@xylabs/react-shared'
import { Account } from '@xyo-network/account'
import { Module, ModuleWrapper } from '@xyo-network/module'
import { NodeWrapper } from '@xyo-network/node'
import { useState } from 'react'

export type WrapFunc<TModule extends Module = Module, TWrapper extends ModuleWrapper = ModuleWrapper> = (
  module?: TModule,
  account?: Account,
) => TWrapper | undefined

export const createUseModuleHook = <
  TModule extends Module = Module,
  TWrapper extends ModuleWrapper = ModuleWrapper,
  TWrapFunc extends WrapFunc<TModule, TWrapper> = WrapFunc<TModule, TWrapper>,
>(
  wrapFunc: TWrapFunc,
  useNodeHook: (nodeOrAddress: string | undefined, wrap: true) => [NodeWrapper | undefined, Error | undefined],
) => {
  function use(name?: string): [TModule | undefined, Error | undefined]
  function use(name: string | undefined, wrap: true | Account): [TWrapper | undefined, Error | undefined]
  function use(address: string): [TModule | undefined, Error | undefined]
  function use(address: string, wrap: true | Account): [TWrapper | undefined, Error | undefined]
  function use(nameOrAddress?: string, wrap: boolean | Account = false): [TWrapper | TModule | undefined, Error | undefined] {
    const [node, nodeError] = useNodeHook(nameOrAddress, true)
    const [module, setModule] = useState<TModule | TWrapper>()
    const [error, setError] = useState<Error>()
    useAsyncEffect(
      // eslint-disable-next-line react-hooks/exhaustive-deps
      async (mounted) => {
        try {
          if (nodeError) {
            setError(nodeError)
            setModule(undefined)
          } else {
            const module = await node?.resolve<TModule>(nameOrAddress)
            const finalModule = wrap ? wrapFunc(module, typeof wrap === 'boolean' ? undefined : wrap) : module
            if (mounted()) {
              setModule(finalModule)
            }
          }
        } catch (ex) {
          if (mounted()) {
            setError(ex as Error)
            setModule(undefined)
          }
        }
      },
      [wrap, node, nameOrAddress, nodeError],
    )

    return [module, error]
  }
  return use
}

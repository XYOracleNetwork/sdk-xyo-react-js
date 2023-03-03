/* eslint-disable react-hooks/rules-of-hooks */
import { useAsyncEffect } from '@xylabs/react-shared'
import { Account } from '@xyo-network/account'
import { Module, ModuleWrapper } from '@xyo-network/module'
import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { useState } from 'react'

import { useProvidedNode } from './useProvidedNode'

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
  nodeFunc: () => [NodeWrapper | undefined, Error | undefined],
) => {
  function use(name?: string): [TModule | undefined, Error | undefined]
  function use(name: string | undefined, wrap: true | Account): [TWrapper | undefined, Error | undefined]
  function use(wrap: true | Account): [TWrapper | undefined, Error | undefined]
  function use(address: string): [TModule | undefined, Error | undefined]
  function use(address: string, wrap: true | Account): [TWrapper | undefined, Error | undefined]
  function use(
    nameOrAddressOrWrapOrAccount?: string | boolean | Account,
    wrap: boolean | Account = false,
  ): [TWrapper | TModule | undefined, Error | undefined] {
    const [node, nodeError] = nodeFunc()
    const shouldWrap = typeof nameOrAddressOrWrapOrAccount === 'boolean' ? nameOrAddressOrWrapOrAccount : wrap
    const account = typeof nameOrAddressOrWrapOrAccount === 'object' ? nameOrAddressOrWrapOrAccount : typeof wrap === 'boolean' ? undefined : wrap
    const nameOrAddress = typeof nameOrAddressOrWrapOrAccount === 'string' ? nameOrAddressOrWrapOrAccount : undefined
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
            const finalModule = shouldWrap ? wrapFunc(module, account) : module
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
      [wrap, node, nameOrAddress, nodeError, shouldWrap, account],
    )

    return [module, error]
  }
  return use
}

export const useNode = createUseModuleHook<NodeModule, NodeWrapper>(NodeWrapper.wrap, () => useProvidedNode(true))

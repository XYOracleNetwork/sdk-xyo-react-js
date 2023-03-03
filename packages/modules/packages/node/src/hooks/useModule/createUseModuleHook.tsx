/* eslint-disable react-hooks/rules-of-hooks */
import { useAsyncEffect } from '@xylabs/react-shared'
import { Account } from '@xyo-network/account'
import { Module, ModuleWrapper } from '@xyo-network/module'
import { useState } from 'react'

import { useProvidedNode } from '../useNode'

export type WrapFunc<TModule extends Module = Module, TWrapper extends ModuleWrapper = ModuleWrapper> = (
  module?: TModule,
  account?: Account,
) => TWrapper

export const createUseModuleHook = <
  TModule extends Module = Module,
  TWrapper extends ModuleWrapper = ModuleWrapper,
  TWrapFunc extends WrapFunc<TModule, TWrapper> = WrapFunc<TModule, TWrapper>,
>(
  wrapFunc: TWrapFunc,
) => {
  function use(name?: string): TModule | undefined
  function use(name: string | undefined, wrap: true | Account): TWrapper | undefined
  function use(address: string): TModule | undefined
  function use(address: string, wrap: true | Account): TWrapper | undefined
  function use(nameOrAddress?: string, wrap: boolean | Account = false): TWrapper | TModule | undefined {
    const node = useProvidedNode(true)
    const [module, setModule] = useState<TModule>()
    useAsyncEffect(
      // eslint-disable-next-line react-hooks/exhaustive-deps
      async (mounted) => {
        const module = await node?.resolve<TModule>(nameOrAddress)
        if (mounted()) {
          setModule(module)
        }
      },
      [node, nameOrAddress],
    )

    return wrap ? wrapFunc(module, typeof wrap === 'boolean' ? undefined : wrap) : module
  }
  return use
}

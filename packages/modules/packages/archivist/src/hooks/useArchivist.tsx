/* eslint-disable react-hooks/rules-of-hooks */
import { useAsyncEffect } from '@xylabs/react-shared'
import { Account } from '@xyo-network/account'
import { ArchivistModule, ArchivistWrapper } from '@xyo-network/archivist'
import { Module, ModuleWrapper } from '@xyo-network/module'
import { useNode } from '@xyo-network/react-node'
import { useState } from 'react'

type WrapFunc<TModule extends Module = Module, TWrapper extends ModuleWrapper = ModuleWrapper> = (module?: TModule, account?: Account) => TWrapper

const createUseModuleHook = <
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
    const node = useNode(nameOrAddress, true)
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

export const useArchivist = createUseModuleHook<ArchivistModule, ArchivistWrapper>(ArchivistWrapper.wrap)

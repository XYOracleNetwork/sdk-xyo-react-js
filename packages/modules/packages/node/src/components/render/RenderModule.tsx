import { styled } from '@mui/material'
import { TreeItem } from '@mui/x-tree-view'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { ModuleInstance } from '@xyo-network/module-model'
import type { RefObject } from 'react'
import React, { useState } from 'react'

interface RenderModuleProps {
  idRef: RefObject<{
    idIncrementor: number
    ids: string[]
  }>
  mod: WeakRef<ModuleInstance>
}

export const RenderModule: React.FC<RenderModuleProps> = ({ mod, idRef }) => {
  const [childModules, setChildModules] = useState<WeakRef<ModuleInstance>[]>()

  useAsyncEffect(

    async (mounted) => {
      const moduleInstance = mod.deref()
      const { address } = moduleInstance ?? {}
      if (moduleInstance) {
        const children = (await moduleInstance.resolve('*')).filter(childModule => childModule.address !== address)
        if (mounted()) {
          setChildModules(children.map(childModule => new WeakRef(childModule)))
        }
      }
    },
    [mod],
  )

  const increment = () => {
    const newId = (idRef.current.idIncrementor++).toString()
    idRef.current.ids.push(newId)
    return newId
  }

  const moduleInstance = mod.deref()
  const { queries, address } = moduleInstance ?? {}

  return (
    <StyledAddressTreeItem itemId={increment()} label={`address: ${address}`}>
      {queries?.map((query, index) => {
        return <TreeItem key={query} itemId={increment()} label={`query : ${query}`} sx={{ mb: index === queries.length - 1 ? 1.5 : 0.5 }} />
      })}
      {childModules && childModules.length > 0
        ? (
            <TreeItem itemId={increment()} label="children" sx={{ mb: 0.5 }}>
              {childModules.map((childModuleRef) => {
                const childModule = childModuleRef.deref()
                return childModule ? <RenderModule key={childModule?.address} mod={childModuleRef} idRef={idRef} /> : null
              })}
            </TreeItem>
          )
        : null}
    </StyledAddressTreeItem>
  )
}

const StyledAddressTreeItem = styled(TreeItem, { name: 'StyledAddressTreeItem' })(({ theme }) => (
  { '& .MuiTreeItem-content': { marginBottom: theme.spacing(0.25) } }
))

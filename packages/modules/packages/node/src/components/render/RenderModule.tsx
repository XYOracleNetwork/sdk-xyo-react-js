import { styled } from '@mui/material'
import { TreeItem } from '@mui/x-tree-view'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ModuleInstance } from '@xyo-network/module-model'
import { MutableRefObject, useState } from 'react'

interface RenderModuleProps {
  idRef: MutableRefObject<{
    idIncrementor: number
    ids: string[]
  }>
  module: ModuleInstance
}

export const RenderModule: React.FC<RenderModuleProps> = ({ module, idRef }) => {
  const { address, queries } = module ?? {}
  const [childModules, setChildModules] = useState<ModuleInstance[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const children = (await module.resolve('*')).filter((childModule) => childModule.address !== address)
      if (mounted()) {
        setChildModules(children)
      }
    },
    [module, address],
  )

  const increment = () => {
    const newId = (idRef.current.idIncrementor++).toString()
    idRef.current.ids.push(newId)
    return newId
  }

  return (
    <StyledAddressTreeItem nodeId={increment()} label={`address: ${address}`}>
      {queries.map((query, index) => {
        return <TreeItem key={query} nodeId={increment()} label={`query : ${query}`} sx={{ mb: index === queries.length - 1 ? 1.5 : 0.5 }} />
      })}
      {childModules && childModules.length > 0 ?
        <TreeItem nodeId={increment()} label={'children'} sx={{ mb: 0.5 }}>
          {childModules.map((childModule) => (
            <RenderModule key={childModule.address} module={childModule} idRef={idRef} />
          ))}
        </TreeItem>
      : null}
    </StyledAddressTreeItem>
  )
}

const StyledAddressTreeItem = styled(TreeItem, { name: 'StyledAddressTreeItem' })(({ theme }) => ({
  '& .MuiTreeItem-content': {
    marginBottom: theme.spacing(0.25),
  },
}))

import { TreeItem } from '@mui/lab'
import { styled } from '@mui/material'
import { ModuleDescription } from '@xyo-network/module'
import { MutableRefObject } from 'react'

interface RenderModuleProps {
  module: ModuleDescription
  idRef: MutableRefObject<{
    idIncrementor: number
    ids: string[]
  }>
}

export const RenderModule: React.FC<RenderModuleProps> = ({ module, idRef }) => {
  const { address, queries, children: moduleChildren } = module

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
      {moduleChildren && moduleChildren.length > 0 ? (
        <TreeItem nodeId={increment()} label={'children'} sx={{ mb: 0.5 }}>
          {moduleChildren.map((module) => (
            <RenderModule key={module.address} module={module} idRef={idRef} />
          ))}
        </TreeItem>
      ) : null}
    </StyledAddressTreeItem>
  )
}

const StyledAddressTreeItem = styled(TreeItem, { name: 'StyledAddressTreeItem' })(({ theme }) => ({
  '& .MuiTreeItem-content': {
    marginBottom: theme.spacing(0.25),
  },
}))

import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { ModuleDescription } from '@xyo-network/module-model'
import { NodeInstance } from '@xyo-network/node-model'
import { useMemo } from 'react'

import { ModuleFromNodeConfig, useNodeFromNode, useProvidedNode } from '../hooks'

export const useNode = (node?: string | NodeInstance, config?: ModuleFromNodeConfig | undefined): [NodeInstance | undefined, Error | undefined] => {
  const nodeAddress = useMemo(() => (typeof node === 'string' ? node : undefined), [node])
  const nodeInstance = useMemo(() => (typeof node === 'object' ? node : undefined), [node])
  const [providedNode] = useProvidedNode()
  const [stringParamsNode, error] = useNodeFromNode(nodeAddress, config)
  return [nodeInstance ?? stringParamsNode ?? providedNode ?? undefined, error]
}

export const useNodeDescription = (
  node?: string | NodeInstance,
  config?: ModuleFromNodeConfig | undefined,
): [ModuleDescription | undefined, Error | undefined] => {
  const [activeNode, nodeError] = useNode(node, config)
  const [description, error] = usePromise(async () => {
    return await activeNode?.describe()
  }, [activeNode])
  return [description, nodeError ?? error]
}

export interface NodeDescriptionBoxProps extends FlexBoxProps {
  node?: string | NodeInstance
}

export const NodeDescriptionBox: React.FC<NodeDescriptionBoxProps> = ({ node, ...props }) => {
  const [description, error] = useNodeDescription(node)

  return (
    <FlexCol {...props}>
      <code color={error ? 'red' : undefined}>{error ? error.message : JSON.stringify(description, null, 2)}</code>
    </FlexCol>
  )
}

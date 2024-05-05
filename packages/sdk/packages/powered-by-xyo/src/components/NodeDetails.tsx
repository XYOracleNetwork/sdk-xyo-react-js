import { FlexCol } from '@xylabs/react-flexbox'
import { NodeInstance } from '@xyo-network/node-model'
import { useProvidedNode, useWeakModulesFromNode } from '@xyo-network/react-node'

import { ModuleAccordion } from './ModuleAccordion'
import { ModuleDetailsProps } from './ModuleDetails'

export interface NodeViewerProps extends ModuleDetailsProps<NodeInstance> {}

export const NodeDetails: React.FC<NodeViewerProps> = ({ mod, ...props }) => {
  const [node = mod] = useProvidedNode()

  const [children] = useWeakModulesFromNode(undefined, { node: node ?? undefined })

  return (
    <FlexCol alignItems="stretch" {...props}>
      {children ?
        <>
          <FlexCol alignItems="stretch" marginY={1}>
            {children?.map((child) => {
              const instance = child.deref()
              return instance ? <ModuleAccordion key={instance.address} mod={instance} /> : null
            })}
          </FlexCol>
        </>
      : null}
    </FlexCol>
  )
}

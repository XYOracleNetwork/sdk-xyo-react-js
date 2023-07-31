import { FlexCol } from '@xylabs/react-flexbox'
import { NodeInstance } from '@xyo-network/node-model'
import { useModulesFromNode, useProvidedNode } from '@xyo-network/react-node'

import { ModuleAccordion } from './ModuleAccordion'
import { ModuleDetailsProps } from './ModuleDetails'

export interface NodeViewerProps extends ModuleDetailsProps<NodeInstance> {}

export const NodeDetails: React.FC<NodeViewerProps> = ({ module, ...props }) => {
  const [node = module] = useProvidedNode()

  const [children] = useModulesFromNode(undefined, { node: node ?? undefined })

  return (
    <FlexCol alignItems="stretch" {...props}>
      {children ? (
        <>
          <FlexCol alignItems="stretch" marginY={1}>
            {children?.map((child) => <ModuleAccordion key={child.address} module={child} />)}
          </FlexCol>
        </>
      ) : null}
    </FlexCol>
  )
}

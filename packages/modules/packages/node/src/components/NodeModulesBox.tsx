import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { NodeInstance } from '@xyo-network/node-model'

import { useModulesFromNode } from '../hooks'

export interface NodeDescriptionBoxProps extends FlexBoxProps {
  node?: string | NodeInstance
}

export const NodeDescriptionBox: React.FC<NodeDescriptionBoxProps> = ({ node, ...props }) => {
  const [description, error] = useModulesFromNode(undefined, { node })

  return (
    <FlexCol {...props}>
      <code color={error ? 'red' : undefined}>{error ? error.message : JSON.stringify(description, null, 2)}</code>
    </FlexCol>
  )
}

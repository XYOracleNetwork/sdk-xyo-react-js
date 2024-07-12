import { exists } from '@xylabs/exists'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { NodeInstance } from '@xyo-network/node-model'

import { useWeakModulesFromNode } from '../hooks/index.js'

export interface NodeDescriptionBoxProps extends FlexBoxProps {
  node?: string | NodeInstance
}

export const NodeDescriptionBox: React.FC<NodeDescriptionBoxProps> = ({ node, ...props }) => {
  const [description, error] = useWeakModulesFromNode(undefined, { node })

  return (
    <FlexCol {...props}>
      <code color={error ? 'red' : undefined}>
        {error ? error.message : JSON.stringify(description?.map((desc) => desc.deref()).filter(exists), null, 2)}
      </code>
    </FlexCol>
  )
}

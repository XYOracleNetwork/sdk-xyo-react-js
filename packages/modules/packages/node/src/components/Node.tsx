import { FlexBoxProps } from '@xylabs/react-flexbox'
import { NodeInstance } from '@xyo-network/node-model'

import { NodeDescriptionBox } from './NodeDescriptionBox'

export interface NodeBoxProps extends FlexBoxProps {
  node?: string | NodeInstance
  variant?: 'description'
}

export const NodeBox: React.FC<NodeBoxProps> = ({ variant, ...props }) => {
  switch (variant) {
    case 'description':
    default:
      return <NodeDescriptionBox {...props} />
  }
}

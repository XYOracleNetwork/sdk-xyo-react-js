import { FlexBoxProps } from '@xylabs/react-flexbox'
import { NodeInstance } from '@xyo-network/node-model'

import { NodeDescriptionBox } from './NodeDescriptionBox'

export interface NodeBoxProps extends FlexBoxProps {
  node?: string | WeakRef<NodeInstance>
  variant?: 'description'
}

export const NodeBox: React.FC<NodeBoxProps> = ({ variant, ...props }) => {
  switch (variant) {
    // eslint-disable-next-line unicorn/no-useless-switch-case
    case 'description':
    default: {
      return <NodeDescriptionBox {...props} />
    }
  }
}

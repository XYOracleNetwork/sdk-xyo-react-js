import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { NodeInstance } from '@xyo-network/node-model'
import React from 'react'

import { useWeakNodeDescription } from '../hooks/index.js'

export interface NodeDescriptionBoxProps extends FlexBoxProps {
  node?: string | WeakRef<NodeInstance>
}

export const NodeDescriptionBox: React.FC<NodeDescriptionBoxProps> = ({ node, ...props }) => {
  const [description, error] = useWeakNodeDescription({ node })

  return (
    <FlexCol {...props}>
      <code color={error ? 'red' : undefined}>{error ? error.message : JSON.stringify(description, null, 2)}</code>
    </FlexCol>
  )
}

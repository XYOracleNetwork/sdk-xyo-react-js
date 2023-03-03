import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { NodeWrapper } from '@xyo-network/node'
import { useState } from 'react'

import { useProvidedNode } from '../hooks'

export const NodeBox: React.FC<FlexBoxProps> = (props) => {
  const node = useProvidedNode()
  const [description, setDescription] = useState<string>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const wrapper = node ? NodeWrapper.wrap(node) : undefined
      setDescription(JSON.stringify(await wrapper?.describe(), null, 2))
    },
    [node],
  )

  return (
    <FlexCol {...props}>
      <pre>{description}</pre>
    </FlexCol>
  )
}

import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useState } from 'react'

import { useProvidedNode } from '../hooks'

export const NodeBox: React.FC<FlexBoxProps> = (props) => {
  const [node] = useProvidedNode()
  const [description, setDescription] = useState<string>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      setDescription(JSON.stringify(await node?.describe(), null, 2))
    },
    [node],
  )

  return (
    <FlexCol {...props}>
      <pre>{description}</pre>
    </FlexCol>
  )
}

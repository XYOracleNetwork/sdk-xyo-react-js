import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { useState } from 'react'

import { useNode } from '../contexts'

export const NodeBox: React.FC<FlexBoxProps> = (props) => {
  const [node] = useNode()
  const [description, setDescription] = useState<string>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      setDescription(JSON.stringify(await node?.description(), null, 2))
    },
    [node],
  )

  return (
    <FlexCol {...props}>
      <pre>{description}</pre>
    </FlexCol>
  )
}

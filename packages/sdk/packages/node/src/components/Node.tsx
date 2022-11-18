import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'

import { useNode } from '../contexts'

export const NodeBox: React.FC<FlexBoxProps> = (props) => {
  const [node] = useNode()
  return (
    <FlexCol {...props}>
      <Typography>{JSON.stringify(node?.description(), null, 2)}</Typography>
    </FlexCol>
  )
}

import { Typography } from '@mui/material'
import { FlexRow } from '@xylabs/sdk-react'

interface Props {
  value?: string | number | boolean | null
}

const Value: React.FC<Props> = (props) => {
  const { value } = props
  return <FlexRow>{value !== undefined ? <Typography variant="caption">{value}</Typography> : null}</FlexRow>
}

export { Value }

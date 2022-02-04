import { Typography } from '@mui/material'
import { FlexRow } from '@xylabs/sdk-react'

export interface ValueProps {
  value?: string | number | boolean | null
}

export const Value: React.FC<ValueProps> = (props) => {
  const { value } = props
  return <FlexRow>{value !== undefined ? <Typography variant="caption">{value}</Typography> : null}</FlexRow>
}

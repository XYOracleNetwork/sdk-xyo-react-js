import { Paper, useTheme } from '@mui/material'
import { JsonViewerEx, type JsonViewerExProps } from '@xyo-network/react-payload-raw-info'
import React from 'react'

export interface JsonPayloadLikeViewerExProps extends JsonViewerExProps {}

export const JsonPayloadLikeViewerEx: React.FC<JsonPayloadLikeViewerExProps> = ({ ...props }) => {
  const theme = useTheme()

  return props.value
    ? (
        <Paper sx={{ width: '100%', padding: theme.spacing(2) }}>
          <JsonViewerEx style={{ width: '100%' }} {...props} />
        </Paper>
      )
    : null
}

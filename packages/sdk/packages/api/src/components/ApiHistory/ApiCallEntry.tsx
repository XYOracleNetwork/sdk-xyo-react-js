import { TableCell, TableRow, Typography } from '@mui/material'
import { XyoApiError, XyoApiResponse } from '@xyo-network/api-models'

export interface ApiCallEntryProps {
  call: XyoApiResponse | XyoApiError
  index: number
  bgColor?: string
}

const ApiCallEntry: React.FC<ApiCallEntryProps> = ({ call, bgColor, index }) => {
  const formatCall = (call: ApiCallEntryProps['call']) => {
    if ((call as XyoApiError).isXyoError) {
      const error = call as XyoApiError
      return `${error.code} - ${error.message}`
    } else {
      const response = call as XyoApiResponse
      return `${response.status} ${response.statusText ? `- ${response.statusText}` : ''}`
    }
  }

  return (
    <TableRow>
      <TableCell sx={{ backgroundColor: bgColor }}>
        <Typography variant="caption">{index + 1}.</Typography>
      </TableCell>
      <TableCell sx={{ backgroundColor: bgColor }}>
        <Typography variant="caption">{call.config?.method?.toUpperCase()}</Typography>
      </TableCell>
      <TableCell sx={{ backgroundColor: bgColor }}>
        <Typography variant="caption">{formatCall(call)}</Typography>
      </TableCell>
      <TableCell sx={{ backgroundColor: bgColor }}>
        <Typography variant="caption">{call.config?.url}</Typography>
      </TableCell>
    </TableRow>
  )
}

export { ApiCallEntry }

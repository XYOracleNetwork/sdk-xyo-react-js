import { Alert, AlertTitle, Typography, useTheme } from '@mui/material'
import { FlexRow } from '@xylabs/sdk-react'
import { XyoApiError, XyoApiResponse } from '@xyo-network/sdk-xyo-client-js'
import isEmpty from 'lodash/isEmpty'

export interface ApiCallEntryProps {
  call: XyoApiResponse | XyoApiError
  index: number
}

const ApiCallEntry: React.FC<ApiCallEntryProps> = ({ call, index, ...alertStyles }) => {
  const theme = useTheme()
  const styles = isEmpty(alertStyles) ? { marginBottom: theme.spacing(1), width: '100%' } : alertStyles

  const formatCall = (call: ApiCallEntryProps['call']) => {
    if ((call as XyoApiError).isXyoError) {
      const error = call as XyoApiError
      return `${error.code} - ${error.message}`
    } else {
      const response = call as XyoApiResponse
      return `${response.status} - ${response.statusText}`
    }
  }

  return (
    <FlexRow flexGrow={1}>
      <FlexRow px={1}>{index}. </FlexRow>
      <FlexRow flexGrow={1} justifyContent={'start'}>
        <Alert sx={styles} severity={(call as XyoApiError).isXyoError ? 'error' : 'success'}>
          <AlertTitle>
            {call.config.method?.toUpperCase()} {formatCall(call)}
          </AlertTitle>
          <Typography variant="caption" mr={0.5} fontWeight="bold">
            URL:
          </Typography>
          <Typography variant="caption">{call.config.url}</Typography>
          <br />
        </Alert>
      </FlexRow>
    </FlexRow>
  )
}

export { ApiCallEntry }

import { Alert, AlertTitle, SxProps, useTheme } from '@mui/material'
import { AxiosError } from 'axios'

import { ApiCall } from './ApiLoggerTypes'

const isAxiosError = (call: unknown): call is AxiosError => (call as AxiosError).isAxiosError

export interface ApiLogEntryProps {
  call: ApiCall
  alertStyles?: SxProps
}
const ApiLogEntry: React.FC<ApiLogEntryProps> = ({ call, alertStyles }) => {
  const theme = useTheme()
  const styles = alertStyles || { marginBottom: theme.spacing(1) }
  if (isAxiosError(call)) {
    return (
      <Alert sx={styles} severity="error">
        <AlertTitle>
          {call.config.method?.toUpperCase()} {call.response?.status} - {call.config.url}
        </AlertTitle>
        Error: {call.message}
      </Alert>
    )
  } else {
    return (
      <Alert sx={styles} severity="error">
        <AlertTitle>
          {call.config.method?.toUpperCase()} {call.status} - {call.config.url}
        </AlertTitle>
      </Alert>
    )
  }
}

export { ApiLogEntry }

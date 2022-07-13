import { Alert, AlertTitle, Typography, useTheme } from '@mui/material'
import { XyoApiError } from '@xyo-network/api'

export interface ApiErrorAlertProps {
  call?: XyoApiError
}

const ApiErrorAlert: React.FC<ApiErrorAlertProps> = ({ call, ...props }) => {
  const theme = useTheme()
  return (
    <Alert {...props} sx={{ marginBottom: theme.spacing(1) }} severity="error">
      <AlertTitle>
        {call?.config?.method?.toUpperCase()} {call?.response?.status} - {call?.config.url}
      </AlertTitle>
      <Typography variant="caption" mr={0.5} fontWeight="bold">
        Error:
      </Typography>
      <Typography variant="caption">{call?.message}</Typography>
    </Alert>
  )
}

export { ApiErrorAlert }

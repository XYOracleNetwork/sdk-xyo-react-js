import { Alert, AlertProps, AlertTitle, Typography } from '@mui/material'
import { XyoApiError } from '@xyo-network/api'

export interface ApiErrorAlertProps extends AlertProps {
  call?: XyoApiError
}

const ApiErrorAlert: React.FC<ApiErrorAlertProps> = ({ call, ...props }) => {
  return (
    <Alert severity="error" {...props}>
      <AlertTitle>Whoops! Something went wrong</AlertTitle>
      <Typography sx={{ wordBreak: 'break-all' }}>{call?.config?.url}</Typography>
      <Typography variant="caption" mr={0.5} fontWeight="bold">
        Error:
      </Typography>
      <Typography variant="caption">{call?.message}</Typography>
    </Alert>
  )
}

export { ApiErrorAlert }

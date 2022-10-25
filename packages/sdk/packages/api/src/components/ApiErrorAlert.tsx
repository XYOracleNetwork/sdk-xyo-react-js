import { Alert, AlertProps, AlertTitle, Typography } from '@mui/material'
import { XyoApiError } from '@xyo-network/api'
import { XyoError, XyoErrorSchema } from '@xyo-network/module'

export interface ApiErrorAlertProps extends AlertProps {
  call?: XyoApiError | XyoError
}

const ApiErrorAlert: React.FC<ApiErrorAlertProps> = ({ call, ...props }) => {
  const apiError = (call as XyoError)?.schema !== XyoErrorSchema ? (call as XyoApiError) : undefined
  return (
    <Alert severity="error" {...props}>
      <AlertTitle>Whoops! Something went wrong</AlertTitle>
      <Typography sx={{ wordBreak: 'break-all' }}>{apiError?.config?.url}</Typography>
      <Typography variant="caption" mr={0.5} fontWeight="bold">
        Error:
      </Typography>
      <Typography variant="caption">{call?.message}</Typography>
    </Alert>
  )
}

export { ApiErrorAlert }

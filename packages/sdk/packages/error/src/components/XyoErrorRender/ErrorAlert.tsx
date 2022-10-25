import { Alert, AlertProps, AlertTitle, Typography } from '@mui/material'
import { XyoError } from '@xyo-network/module'

export interface XyoErrorAlertProps extends AlertProps {
  error?: XyoError
}

export const XyoErrorAlert: React.FC<XyoErrorAlertProps> = ({ error, ...props }) => {
  return (
    <Alert severity="error" {...props}>
      <AlertTitle>Whoops! Something went wrong</AlertTitle>
      <Typography variant="caption" mr={0.5} fontWeight="bold">
        Error:
      </Typography>
      <Typography variant="caption">{error?.message}</Typography>
    </Alert>
  )
}

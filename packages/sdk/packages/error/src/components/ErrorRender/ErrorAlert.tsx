import { Alert, AlertProps, AlertTitle, Typography } from '@mui/material'
import { ModuleError } from '@xyo-network/module-model'

export interface ErrorAlertProps extends AlertProps {
  error?: ModuleError | Error
  errorContext?: string
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, errorContext, ...props }) => {
  return (
    <Alert severity="error" {...props}>
      <AlertTitle>Whoops! Something went wrong</AlertTitle>
      {errorContext ? (
        <Typography variant="caption" my={0.5} lineHeight="1" display="block">
          {errorContext}
        </Typography>
      ) : null}
      <Typography variant="caption" mr={0.5} fontWeight="bold">
        Error:
      </Typography>
      <Typography variant="caption">{error?.message}</Typography>
    </Alert>
  )
}

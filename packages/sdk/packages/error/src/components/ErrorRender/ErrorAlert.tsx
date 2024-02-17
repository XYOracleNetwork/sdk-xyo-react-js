import { ExitToApp as ExitIcon } from '@mui/icons-material'
import { Alert, AlertProps, AlertTitle, Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { ModuleError } from '@xyo-network/payload-model'

export interface ErrorAlertProps extends AlertProps {
  error?: ModuleError | Error
  errorContext?: string
  onCancel?: () => void
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ onCancel, error, errorContext, ...props }) => {
  return (
    <Alert severity="error" {...props}>
      <AlertTitle>Whoops! Something went wrong</AlertTitle>
      {errorContext ?
        <Typography variant="caption" my={0.5} lineHeight="1" display="block">
          {errorContext}
        </Typography>
      : null}
      <Typography variant="caption" mr={0.5} fontWeight="bold">
        Error:
      </Typography>
      <Typography variant="caption">{error?.message}</Typography>
      {onCancel ?
        <ButtonEx variant="outlined" size="small" onClick={onCancel} position="absolute" style={{ right: 8, top: 8 }}>
          <ExitIcon fontSize="small" />
        </ButtonEx>
      : null}
    </Alert>
  )
}

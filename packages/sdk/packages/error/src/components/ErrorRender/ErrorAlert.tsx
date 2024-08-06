import { ExitToApp as ExitIcon } from '@mui/icons-material'
import { Alert, AlertProps, AlertTitle, Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { ModuleError } from '@xyo-network/payload-model'

export interface ErrorAlertProps extends AlertProps {
  error?: ModuleError | Error | string
  /** @deprecated use scope instead */
  errorContext?: string
  onCancel?: () => void
  scope?: string
}

// eslint-disable-next-line deprecation/deprecation
export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'Whoops! Something went wrong',
  onCancel,
  error = 'An unknown error occurred',
  errorContext,
  scope,
  ...props
}) => {
  const finalScope = scope ?? errorContext
  return (
    <Alert severity="error" {...props}>
      <AlertTitle>{title}</AlertTitle>
      {finalScope
        ? (
            <div>
              <Typography variant="caption" mr={0.5} fontWeight="bold">
                Scope:
              </Typography>
              <Typography variant="caption">{finalScope}</Typography>
            </div>
          )
        : null}
      <div>
        <Typography variant="caption" mr={0.5} fontWeight="bold">
          Error:
        </Typography>
        <Typography variant="caption">{typeof error === 'string' ? error : error?.message}</Typography>
      </div>
      {onCancel
        ? (
            <ButtonEx variant="outlined" size="small" onClick={onCancel} position="absolute" style={{ right: 8, top: 8 }}>
              <ExitIcon fontSize="small" />
            </ButtonEx>
          )
        : null}
    </Alert>
  )
}

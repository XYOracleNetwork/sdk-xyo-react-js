import { Alert, AlertProps, AlertTitle, Card, CardContent, CardProps, Typography } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

interface EmbedErrorCardBaseProps {
  alertProps?: AlertProps
  error?: Error
  hideErrorDetails?: boolean
  scope?: string
}

interface EmbedErrorCardProps extends EmbedErrorCardBaseProps, CardProps {}

export const EmbedErrorCard: React.FC<WithChildren<EmbedErrorCardProps>> = (props) => {
  const { alertProps, error, scope, hideErrorDetails = true, children, ...cardProps } = props
  const errorProps = { alertProps, error, hideErrorDetails, scope }
  return (
    <Card {...cardProps}>
      <CardContent>{children ?? <DefaultErrorAlert {...errorProps} />}</CardContent>
    </Card>
  )
}

const DefaultErrorAlert: React.FC<EmbedErrorCardBaseProps> = ({ alertProps, scope, hideErrorDetails, error }) => {
  return (
    <Alert severity="error" {...alertProps}>
      <AlertTitle>Whoops! Something went wrong</AlertTitle>
      {scope
        ? (
            <Typography variant="caption">
              Scope:
              {scope}
            </Typography>
          )
        : null}
      {!hideErrorDetails && error
        ? (
            <>
              <Typography variant="caption">Error: </Typography>
              <Typography variant="caption">{error?.message}</Typography>
            </>
          )
        : (
            <Typography variant="caption" fontSize="small">
              Error Loading Plugin
            </Typography>
          )}
    </Alert>
  )
}

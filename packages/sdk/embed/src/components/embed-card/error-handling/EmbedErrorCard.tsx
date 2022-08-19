import { Alert, AlertProps, AlertTitle, Card, CardContent, CardProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

interface EmbedErrorCardBaseProps {
  alertProps?: AlertProps
  error?: Error
  showErrorMessage?: boolean
}

interface EmbedErrorCardProps extends EmbedErrorCardBaseProps, CardProps {
  alertProps?: AlertProps
  error?: Error
  showErrorMessage?: boolean
}

export const EmbedErrorCard: React.FC<WithChildren<EmbedErrorCardProps>> = (props) => {
  const { alertProps, error, showErrorMessage, children, ...cardProps } = props
  const errorProps = { alertProps, error, showErrorMessage }
  return (
    <Card {...cardProps}>
      <CardContent>{children ?? <DefaultErrorAlert {...errorProps} />}</CardContent>
    </Card>
  )
}

const DefaultErrorAlert: React.FC<EmbedErrorCardBaseProps> = ({ alertProps, showErrorMessage, error }) => {
  return (
    <Alert severity="error" {...alertProps}>
      <AlertTitle>Whoops! Something went wrong</AlertTitle>
      Error Loading Plugin. {showErrorMessage && error ? `- ${error?.message}` : null}
    </Alert>
  )
}

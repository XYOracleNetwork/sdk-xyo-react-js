import { BoxProps } from '@material-ui/core'

interface ErrorsViewerProps extends BoxProps {
  errors?: Error[]
  onRetry?: () => void
}

export default ErrorsViewerProps

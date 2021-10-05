import { BoxProps } from '@mui/material'

interface ErrorsViewerProps extends BoxProps {
  errors?: Error[]
  onRetry?: () => void
}

export default ErrorsViewerProps

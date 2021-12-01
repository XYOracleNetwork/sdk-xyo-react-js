/* eslint-disable @delagen/deprecation/deprecation */
import { BoxProps } from '@mui/material'

/** @deprecated Moved to @xylabs/sdk-react */
interface ErrorsViewerProps extends BoxProps {
  errors?: Error[]
  onRetry?: () => void
}

export default ErrorsViewerProps

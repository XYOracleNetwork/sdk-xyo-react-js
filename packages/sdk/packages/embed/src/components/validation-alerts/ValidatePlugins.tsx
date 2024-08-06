import { Alert, AlertProps, AlertTitle } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

import { useEmbedPluginState, useResolvePayload } from '../../contexts/index.js'

export const ValidatePluginsAlert: React.FC<WithChildren<AlertProps>> = ({ children, ...props }) => {
  const { payload } = useResolvePayload()
  const { plugins } = useEmbedPluginState()

  if (payload && plugins?.length === 0) {
    return (
      <Alert severity="warning" {...props}>
        <AlertTitle>Missing plugins!</AlertTitle>
        Payload found but no plugins were present.
      </Alert>
    )
  }

  return <>{children}</>
}

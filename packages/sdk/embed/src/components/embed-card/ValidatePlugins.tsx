import { Alert, AlertTitle } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

import { useResolvePayload, useXyoEmbedPluginState } from '../../contexts'

export const ValidatePlugins: React.FC<WithChildren> = ({ children }) => {
  const { payload } = useResolvePayload()
  const { plugins } = useXyoEmbedPluginState()

  if (payload && plugins?.length === 0) {
    return (
      <Alert severity="warning">
        <AlertTitle>Missing plugins!</AlertTitle>Payload found but no plugins were present.
      </Alert>
    )
  }

  return <>{children}</>
}

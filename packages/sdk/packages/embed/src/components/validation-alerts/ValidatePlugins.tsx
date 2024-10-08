import type { AlertProps } from '@mui/material'
import { Alert, AlertTitle } from '@mui/material'
import type { WithChildren } from '@xylabs/react-shared'
import React from 'react'

import { useEmbedPluginState, useResolvePayload } from '../../contexts/index.ts'

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

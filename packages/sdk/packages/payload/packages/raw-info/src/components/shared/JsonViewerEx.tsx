import { useTheme } from '@mui/material'
import type { JsonViewerProps } from '@textea/json-viewer'
import { JsonViewer } from '@textea/json-viewer'
import { useIsDark } from '@xylabs/react-theme'
import React from 'react'

export type JsonViewerExProps = JsonViewerProps

export const JsonViewerEx: React.FC<JsonViewerExProps> = (props) => {
  const theme = useTheme()
  const isDark = useIsDark()

  return (
    <JsonViewer
      theme={isDark ? 'dark' : 'light'}
      collapseStringsAfterLength={50}
      style={{
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
      }}
      {...props}
    />
  )
}

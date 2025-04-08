import { useColorScheme, useTheme } from '@mui/material'
import type { JsonViewerProps } from '@textea/json-viewer'
import { JsonViewer } from '@textea/json-viewer'
import React from 'react'

export type JsonViewerExProps = JsonViewerProps

export const JsonViewerEx: React.FC<JsonViewerExProps> = (props) => {
  const theme = useTheme()
  const { mode, systemMode } = useColorScheme()

  const darkMode = mode === 'dark' || (mode === 'system' && systemMode === 'dark')

  return (
    <JsonViewer
      theme={mode ? 'dark' : 'light'}
      collapseStringsAfterLength={50}
      style={{
        background: darkMode ? theme.palette.background.paper : theme.palette.grey[200],
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
      }}
      {...props}
    />
  )
}

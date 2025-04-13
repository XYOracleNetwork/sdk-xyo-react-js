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
      theme={darkMode ? 'dark' : 'light'}
      collapseStringsAfterLength={50}
      style={{
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
      }}
      {...props}
    />
  )
}

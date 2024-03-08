import { useTheme } from '@mui/material'
import { JsonViewer, JsonViewerProps } from '@textea/json-viewer'
import { useColorSchemeEx } from '@xylabs/react-invertible-theme'

export const JsonViewerEx: React.FC<JsonViewerProps> = (props) => {
  const theme = useTheme()
  const { darkMode } = useColorSchemeEx()

  return (
    <JsonViewer
      theme={darkMode ? 'dark' : 'light'}
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

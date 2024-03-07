import { CircularProgress, useTheme } from '@mui/material'
import { useColorSchemeEx } from '@xylabs/react-invertible-theme'
import { lazy, Suspense } from 'react'
import { OnCopyProps, ReactJsonViewProps } from 'react-json-view'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export const JsonViewEx: React.FC<ReactJsonViewProps> = (props) => {
  const theme = useTheme()
  const { darkMode } = useColorSchemeEx()

  const onCopy = async (event: OnCopyProps) => {
    if (event.src) {
      try {
        const copyContent = typeof event.src === 'string' ? event.src : JSON.stringify(event.src, null, 2)
        await navigator.clipboard.writeText(copyContent)
      } catch (e) {
        console.error('Error Copying to clipboard', e, event.src)
      }
    }
  }

  return (
    <Suspense fallback={<CircularProgress />}>
      <JsonView
        enableClipboard={onCopy}
        theme={darkMode ? 'tomorrow' : 'summerfruit:inverted'}
        collapseStringsAfterLength={50}
        style={{
          background: darkMode ? theme.palette.background.paper : theme.palette.grey[200],
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(2),
        }}
        {...props}
      />
    </Suspense>
  )
}

import {
  Alert, Snackbar, useMediaQuery, useTheme,
} from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

export interface XnsNameCaptureErrorsProps {
  error?: Error
  errorUi?: 'alert' | 'toast'
  resetError?: () => void
}

export const XnsNameCaptureErrors: React.FC<XnsNameCaptureErrorsProps> = ({
  error, errorUi, resetError,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {(errorUi === 'toast')
        ? (
            <Snackbar
              open={!!error}
              message={error?.toString()}
              autoHideDuration={3000}
              onClose={() => resetError?.()}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                severity="error"
                sx={{
                  width: '100%', display: (isMobile && !error) ? 'none' : undefined, visibility: error ? 'visible' : 'hidden',
                }}
              >
                {error?.message}
              </Alert>
            </Snackbar>
          )
        : (() => {
            // setTimeout(() => setError(undefined), 1500)
            return (
              <FlexRow alignSelf="stretch">
                <Alert
                  severity="error"
                  sx={{ display: (isMobile && !error) ? 'none' : undefined, visibility: error ? 'visible' : 'hidden' }}
                >
                  {error?.message}
                </Alert>
              </FlexRow>
            )
          })()}
    </>
  )
}

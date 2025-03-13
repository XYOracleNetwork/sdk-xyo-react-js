import { ExitToApp as ExitIcon } from '@mui/icons-material'
import type { AlertProps } from '@mui/material'
import {
  Alert, AlertTitle, Typography,
} from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import React from 'react'

export interface ErrorAlertProps<T = void> extends AlertProps {
  error?: T | Error | string
  /** @deprecated use scope instead */
  errorContext?: string
  onCancel?: () => void
  scope?: string
}

export function ErrorAlert<T = void>({
  title = 'Whoops! Something went wrong',
  onCancel,
  error = 'An unknown error occurred',
  errorContext,
  scope,
  ...props
}: ErrorAlertProps<T>) {
  const finalScope = scope ?? errorContext
  return (
    <Alert severity="error" {...props}>
      <AlertTitle>{title}</AlertTitle>
      {finalScope
        ? (
            <div>
              <Typography variant="caption" mr={0.5} fontWeight="bold">
                Scope:
              </Typography>
              <Typography variant="caption">{finalScope}</Typography>
            </div>
          )
        : null}
      <div>
        <Typography variant="caption" mr={0.5} fontWeight="bold">
          Error:
        </Typography>
        <Typography variant="caption">{typeof error === 'string' ? error : (error as Error)?.message}</Typography>
      </div>
      {onCancel
        ? (
            <ButtonEx
              variant="outlined"
              size="small"
              onClick={onCancel}
              position="absolute"
              style={{ right: 8, top: 8 }}
            >
              <ExitIcon fontSize="small" />
            </ButtonEx>
          )
        : null}
    </Alert>
  )
}

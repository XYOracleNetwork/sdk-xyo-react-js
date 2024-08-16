import { CopyAllRounded } from '@mui/icons-material'
import type { StandardTextFieldProps } from '@mui/material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { forget } from '@xylabs/forget'
import React, { useState } from 'react'

export interface CopyLinkTextFieldProps extends StandardTextFieldProps {
  shareLinkName?: string
  shareUrl?: string
}

export const CopyLinkTextField: React.FC<CopyLinkTextFieldProps> = ({ shareLinkName, shareUrl, ...props }) => {
  const [error, setError] = useState<Error>()

  const copyToClipboard = async (link?: string) => {
    if (link) {
      try {
        await navigator.clipboard.writeText(link)
      } catch (e) {
        const message = 'Error copying shareUrl to clipboard'
        console.error(message, e, link)
        setError(new Error(message))
      }
    } else {
      console.warn('tried to copy shareUrl before it was generated')
    }
  }

  return (
    <TextField
      disabled
      error={!!error}
      helperText={error?.message}
      // to override the color that appears when it's a text field, only on dark mode
      sx={{ input: { WebkitTextFillColor: 'lightgray !important' } }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label={`copy ${shareLinkName} link`} onClick={() => forget(copyToClipboard(shareUrl))} edge="end">
              <CopyAllRounded />
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={shareUrl}
      {...props}
    />
  )
}

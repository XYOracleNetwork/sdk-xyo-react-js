import type { StandardTextFieldProps } from '@mui/material'
import { InputAdornment, TextField } from '@mui/material'
import React, { useCallback, useState } from 'react'

import { CopyIconButton } from './CopyIconButton.tsx'

export interface CopyLinkTextFieldProps extends StandardTextFieldProps {
  shareLinkName?: string
  shareUrl?: string
}

export const CopyLinkTextField: React.FC<CopyLinkTextFieldProps> = ({
  shareLinkName, shareUrl, ...props
}) => {
  const [error, setError] = useState<Error>()

  const onClickError = useCallback((error?: Error) => {
    setError(error)
  }, [])

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
            <CopyIconButton shareLinkName={shareLinkName} shareUrl={shareUrl} onClickError={onClickError} />
          </InputAdornment>
        ),
      }}
      value={shareUrl}
      {...props}
    />
  )
}

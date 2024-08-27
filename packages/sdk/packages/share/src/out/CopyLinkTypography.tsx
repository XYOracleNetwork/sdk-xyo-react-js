import { Cancel } from '@mui/icons-material'
import type { TypographyProps } from '@mui/material'
import { Stack, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'

import { CopyIconButton } from './CopyIconButton.tsx'
import type { ShareLinkProps } from './lib/index.ts'

export interface CopyLinkTypographyProps extends ShareLinkProps, TypographyProps {
  linkVariant?: 'xnsName' | 'basic'
}

export const CopyLinkTypography: React.FC<CopyLinkTypographyProps> = ({
  linkVariant = 'basic', shareLinkName, shareUrl, ...props
}) => {
  const [error, setError] = useState<Error>()

  const onCopyToClipboard = useCallback((error?: Error) => {
    setError(error)
  }, [])

  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      {linkVariant === 'basic' ? <Typography sx={{ display: 'inline-flex' }} {...props}>{shareUrl}</Typography> : null}
      {/* {linkVariant === 'basic' ? <Typography sx={{ display: 'inline-flex' }} {...props}>{shareLinkName}</Typography */}
      <CopyIconButton onCopyToClipboard={onCopyToClipboard} shareLinkName={shareLinkName} shareUrl={shareUrl} sx={{ display: 'inline-flex' }} />
      {error ? <Cancel color="error" sx={{ display: 'inline-flex' }} /> : null}
    </Stack>
  )
}

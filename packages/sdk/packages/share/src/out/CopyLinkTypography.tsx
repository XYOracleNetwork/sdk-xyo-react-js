import { Cancel } from '@mui/icons-material'
import type { TypographyProps } from '@mui/material'
import {
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import React, {
  useCallback, useMemo, useState,
} from 'react'

import { CopyIconButton } from './CopyIconButton.tsx'
import {
  AnimatedGradientTypography, type ShareLinkProps, splitAroundSubstring,
} from './lib/index.ts'

export interface CopyLinkTypographyProps extends ShareLinkProps, TypographyProps {}

export const CopyLinkTypography: React.FC<CopyLinkTypographyProps> = ({
  shareLinkName, shareUrl, xnsName: xnsNameProp, ...props
}) => {
  const [error, setError] = useState<Error>()

  const onCopyToClipboard = useCallback((error?: Error) => {
    setError(error)
  }, [])

  const parsedXnsName = useMemo(() => {
    if (shareUrl && xnsNameProp) {
      try {
        const parts = splitAroundSubstring(shareUrl, xnsNameProp)
        return parts
      } catch (e) {
        setError(e as Error)
      }
    }
  }, [])

  const [part1, xnsName, part3] = parsedXnsName || []

  return (
    <Stack direction="row" alignItems="center" gap={0.25}>
      {xnsName
        ? (
            <Stack direction="row">
              <Typography sx={{ display: 'inline-flex' }} {...props}>{part1}</Typography>
              <AnimatedGradientTypography sx={{ display: 'inline-flex' }} {...props}>{xnsName}</AnimatedGradientTypography>
              <Typography sx={{ display: 'inline-flex' }} {...props}>{part3}</Typography>
            </Stack>
          )
        : <Typography sx={{ display: 'inline-flex' }} {...props}>{shareUrl}</Typography>}
      <CopyIconButton onCopyToClipboard={onCopyToClipboard} shareLinkName={shareLinkName} shareUrl={shareUrl} sx={{ display: 'inline-flex' }} />
      {error ? <Tooltip title={error.message}><Cancel color="error" sx={{ display: 'inline-flex' }} /></Tooltip> : null}
    </Stack>
  )
}

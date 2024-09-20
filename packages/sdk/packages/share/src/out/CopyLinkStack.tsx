import { Cancel } from '@mui/icons-material'
import type { StackProps } from '@mui/material'
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

export interface CopyLinkStackProps extends ShareLinkProps, StackProps {
  addToXnsName?: boolean
  copiedLinkText?: string
  copyLinkText?: string
  xnsEndColor?: string
  xnsStartColor?: string
}

export const CopyLinkStack: React.FC<CopyLinkStackProps> = ({
  addToXnsName, copiedLinkText, copyLinkText, shareLinkName, shareUrl, xnsName: xnsNameProp, xnsEndColor, uploadPayloads, xnsStartColor, ...props
}) => {
  const [error, setError] = useState<Error>()

  const onClickError = useCallback((error: Error) => {
    setError(error)
  }, [])

  const parsedXnsName = useMemo(() => {
    if (shareUrl && xnsNameProp && addToXnsName) {
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
    <Stack direction="row" alignItems="center" gap={0.25} {...props}>
      {xnsName && addToXnsName
        ? (
            <Stack direction="row" maxWidth="100%" sx={{ overflowX: 'auto' }}>
              <Typography sx={{ display: 'inline-flex' }}>{part1}</Typography>
              <AnimatedGradientTypography color1={xnsStartColor} color2={xnsEndColor} sx={{ display: 'inline-flex' }}>{xnsName}</AnimatedGradientTypography>
              <Typography sx={{ display: 'inline-flex' }}>{part3}</Typography>
            </Stack>
          )
        : (
            <Typography sx={{
              display: 'inline-flex', maxWidth: '100%', overflow: 'auto',
            }}
            >
              {shareUrl}
            </Typography>
          )}
      <CopyIconButton
        copiedLinkText={copiedLinkText}
        copyLinkText={copyLinkText}
        onClickError={onClickError}
        shareLinkName={shareLinkName}
        shareUrl={shareUrl}
        sx={{ display: 'inline-flex' }}
        uploadPayloads={uploadPayloads}
      />
      {error ? <Tooltip title={error.message}><Cancel color="error" sx={{ display: 'inline-flex' }} /></Tooltip> : null}
    </Stack>
  )
}

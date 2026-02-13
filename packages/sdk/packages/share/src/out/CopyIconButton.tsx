import { CopyAllRounded } from '@mui/icons-material'
import {
  type ButtonProps, CircularProgress, IconButton, Tooltip,
} from '@mui/material'
import { forget } from '@xylabs/sdk-js'
import React, { useState } from 'react'

import type { ShareLinkProps } from './lib/index.ts'

export interface CopyIconButtonProps extends ButtonProps, ShareLinkProps {
  onClickError?: (error: Error) => void
}

export const CopyIconButton: React.FC<CopyIconButtonProps> = ({
  copyLinkText, copiedLinkText, onClickError, shareLinkName, shareUrl, uploadPayloads, ...props
}) => {
  const CopyLink = copyLinkText ?? 'Copy Link'
  const Copied = copiedLinkText ?? 'Copied!'

  const [copyTooltipTitle, setCopyToolTipTitle] = useState(CopyLink)
  const [loading, setLoading] = useState(false)

  const copyToClipboard = async (link?: string) => {
    if (link) {
      try {
        setLoading(true)
        await uploadPayloads?.()
        await navigator.clipboard.writeText(link)
        setCopyToolTipTitle(Copied)
        setTimeout(() => setCopyToolTipTitle(CopyLink), 2000)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        const message = 'Error copying shareUrl to clipboard'
        console.error(message, e, link)
        onClickError?.(new Error(message))
      }
    } else {
      console.warn('tried to copy shareUrl before it was generated')
    }
  }

  return (
    <Tooltip title={copyTooltipTitle}>
      {loading
        ? (
            <IconButton>
              <CircularProgress size="24px" />
            </IconButton>
          )
        : (
            <IconButton aria-label={`copy ${shareLinkName} link`} onClick={() => forget(copyToClipboard(shareUrl))} edge="end" {...props}>
              <CopyAllRounded />
            </IconButton>
          )}
    </Tooltip>
  )
}

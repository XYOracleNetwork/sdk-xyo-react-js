import { CopyAllRounded } from '@mui/icons-material'
import {
  type ButtonProps, IconButton, Tooltip,
} from '@mui/material'
import { forget } from '@xylabs/forget'
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

  const copyToClipboard = async (link?: string) => {
    if (link) {
      try {
        await uploadPayloads?.()
        await navigator.clipboard.writeText(link)
        setCopyToolTipTitle(Copied)
        setTimeout(() => setCopyToolTipTitle(CopyLink), 2000)
      } catch (e) {
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
      <IconButton aria-label={`copy ${shareLinkName} link`} onClick={() => forget(copyToClipboard(shareUrl))} edge="end" {...props}>
        <CopyAllRounded />
      </IconButton>
    </Tooltip>
  )
}

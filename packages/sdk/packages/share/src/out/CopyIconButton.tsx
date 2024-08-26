import { CopyAllRounded } from '@mui/icons-material'
import { type ButtonProps, IconButton } from '@mui/material'
import { forget } from '@xylabs/forget'
import React from 'react'

import type { ShareLinkProps } from './lib/index.ts'

export interface CopyIconButtonProps extends ButtonProps, ShareLinkProps {
  onCopyToClipboard?: (error?: Error) => void
}

export const CopyIconButton: React.FC<CopyIconButtonProps> = ({
  onCopyToClipboard, shareLinkName, shareUrl, ...props
}) => {
  const copyToClipboard = async (link?: string) => {
    if (link) {
      try {
        await navigator.clipboard.writeText(link)
        onCopyToClipboard?.()
      } catch (e) {
        const message = 'Error copying shareUrl to clipboard'
        console.error(message, e, link)
        onCopyToClipboard?.(new Error(message))
      }
    } else {
      console.warn('tried to copy shareUrl before it was generated')
    }
  }

  return (
    <IconButton aria-label={`copy ${shareLinkName} link`} onClick={() => forget(copyToClipboard(shareUrl))} edge="end" {...props}>
      <CopyAllRounded />
    </IconButton>
  )
}

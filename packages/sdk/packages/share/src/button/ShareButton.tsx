import {
  Facebook as FacebookIcon, Share as ShareIcon,
  X as XIcon,
} from '@mui/icons-material'
import type { PopoverProps } from '@mui/material'
import { Popover } from '@mui/material'
import type { ButtonExProps } from '@xylabs/react-button'
import { ButtonEx } from '@xylabs/react-button'
import { FlexRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
import React, { useRef, useState } from 'react'

export type ShareButtonProps = ButtonExProps & {
  prepared?: boolean
  shareLink?: string
  slot?: { popover?: PopoverProps }
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  prepared = true, shareLink, slot, ...props
}) => {
  const [expanded, setExpanded] = useState(false)
  const anchorRef = useRef(null)
  const link = shareLink ?? globalThis.location.href

  return (
    <FlexRow gap={1}>
      <ButtonEx
        variant="text"
        minWidth={32}
        size="small"
        disabled={!prepared}
        onClick={() => {
          setExpanded(true)
        }}
        {...props}
      >
        <ShareIcon htmlColor="gray" fontSize="small" ref={anchorRef} />
      </ButtonEx>
      <Popover
        open={prepared ? expanded : false}
        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setExpanded(false)}
        transitionDuration={500}
        sx={{
          ml: 1, top: -4, ...slot?.popover?.sx,
        }}
        {...slot?.popover}
      >
        <FlexRow gap={0.5} padding={0.5}>
          <LinkEx
            lineHeight={0}
            onClick={() => {
              window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(link)}`)
              setExpanded(false)
            }}
          >
            <XIcon fontSize="small" />
          </LinkEx>
          <LinkEx
            lineHeight={0}
            style={{ color: '#4267b2' }}
            onClick={() => {
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`)
              setExpanded(false)
            }}
          >
            <FacebookIcon fontSize="small" />
          </LinkEx>
        </FlexRow>
      </Popover>
    </FlexRow>
  )
}

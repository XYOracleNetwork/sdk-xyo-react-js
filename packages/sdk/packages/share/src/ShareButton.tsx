import { Facebook as FacebookIcon, Share as ShareIcon, Twitter as TwitterIcon } from '@mui/icons-material'
import { Popover } from '@mui/material'
import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import { FlexRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
import { useRef, useState } from 'react'

export interface ShareButtonProps extends ButtonExProps {
  prepared?: boolean
  shareLink?: string
}

export const ShareButton: React.FC<ShareButtonProps> = ({ prepared = true, shareLink, ...props }) => {
  const [expanded, setExpanded] = useState(false)
  const anchorRef = useRef(null)
  const link = shareLink ?? window.location.href

  return (
    <FlexRow gap={1} ref={anchorRef}>
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
        <ShareIcon htmlColor="gray" fontSize="small" />
      </ButtonEx>
      <Popover open={prepared ? expanded : false} anchorEl={anchorRef.current} onClose={() => setExpanded(false)} transitionDuration={500}>
        <FlexRow gap={0.5} padding={0.5}>
          <LinkEx
            lineHeight={0}
            style={{ color: '#1da1f2' }}
            onClick={() => {
              window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`)
              setExpanded(false)
            }}
          >
            <TwitterIcon fontSize="small" />
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

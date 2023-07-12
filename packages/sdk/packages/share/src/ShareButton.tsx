import FacebookIcon from '@mui/icons-material/Facebook'
import ShareIcon from '@mui/icons-material/Share'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Popover } from '@mui/material'
import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import { FlexRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
import { useRef, useState } from 'react'

export interface ShareButtonProps extends ButtonExProps {
  prepared?: boolean
}

export const ShareButton: React.FC<ShareButtonProps> = ({ prepared = true, ...props }) => {
  const [expanded, setExpanded] = useState(false)
  const anchorRef = useRef(null)

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
              window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`)
              setExpanded(false)
            }}
          >
            <TwitterIcon fontSize="small" />
          </LinkEx>
          <LinkEx
            lineHeight={0}
            style={{ color: '#4267b2' }}
            onClick={() => {
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)
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

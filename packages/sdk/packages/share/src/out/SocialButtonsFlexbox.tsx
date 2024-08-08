import { Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import { FacebookSvgIcon, XTwitterSvgIcon } from '../icons/index.ts'

export interface SocialButtonsFlexboxProps extends FlexBoxProps {
  shareUrl?: string
}

export const SocialButtonsFlexbox: React.FC<SocialButtonsFlexboxProps> = ({ shareUrl, ...props }) => {
  return (
    <FlexGrowCol alignItems="stretch" paddingTop={2} {...props}>
      <Typography variant="body1" gutterBottom>
        <strong>Share on Social Media</strong>
      </Typography>
      <FlexRow gap={0.5} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
        {shareUrl
          ? (
              <>
                <ButtonEx
                  variant="contained"
                  style={{ backgroundColor: '#000', color: '#fff' }}
                  onClick={() => {
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`)
                  }}
                  startIcon={<XTwitterSvgIcon width="20px" />}
                >
                  Share on X (Twitter)
                </ButtonEx>
                <ButtonEx
                  variant="contained"
                  style={{ backgroundColor: '#4267b2', color: '#fff' }}
                  onClick={() => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
                  }}
                  startIcon={<FacebookSvgIcon />}
                >
                  Share on Facebook
                </ButtonEx>
              </>
            )
          : null}
      </FlexRow>
    </FlexGrowCol>
  )
}

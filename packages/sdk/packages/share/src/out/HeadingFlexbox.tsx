import { Typography } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import React from 'react'

export interface ShareOutHeadingFlexboxProps extends FlexBoxProps {
  shareLinkName?: string
  shareUrl?: string
}

export const ShareOutHeadingFlexbox: React.FC<ShareOutHeadingFlexboxProps> = ({ children, shareLinkName, shareUrl, ...props }) => {
  const GenerateShareLinkExplanation = "When you generate your share link, we'll make a small amount of your data public so friends can check it out!"

  return (
    <FlexGrowCol alignItems="flex-start" paddingBottom={1} {...props}>
      <Typography variant="body1" gutterBottom>
        <strong>Your Share Link</strong>
      </Typography>
      <Typography variant="body1">
        {shareUrl ? `Use this link or the buttons below to share ${shareLinkName}` : GenerateShareLinkExplanation}
      </Typography>
      {children}
    </FlexGrowCol>
  )
}

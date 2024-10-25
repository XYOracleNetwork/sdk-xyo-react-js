import { Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { ErrorRender } from '@xylabs/react-error'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { FacebookSvgIcon, XTwitterSvgIcon } from '../icons/index.ts'

export interface SocialButtonsFlexboxProps extends FlexBoxProps {
  shareUrl?: string
  uploadPayloads?: () => Promise<void>
}

export const SocialButtonsFlexbox: React.FC<SocialButtonsFlexboxProps> = ({
  shareUrl, uploadPayloads, ...props
}) => {
  const [error, setError] = useState<Error>()
  const [xLoading, setXLoading] = useState(false)
  const [fbLoading, setFbLoading] = useState(false)

  const handleClick = async (openUrl: () => void, buttonName: 'x' | 'fb') => {
    const setLoading = buttonName === 'x' ? setXLoading : setFbLoading
    try {
      setLoading(true)
      await uploadPayloads?.()
      setLoading(false)
      openUrl()
    } catch (e) {
      setLoading(false)
      console.error('Error uploading payloads', e)
      setError(e as Error)
    }
  }

  return (
    <FlexGrowCol alignItems="stretch" paddingTop={2} {...props}>
      <Typography variant="body1" gutterBottom>
        <strong>Share on Social Media</strong>
      </Typography>
      <FlexRow
        gap={0.5}
        sx={{ flexDirection: { md: 'row', xs: 'column' } }}
      >
        {shareUrl
          ? (
              <>
                <ButtonEx
                  variant="contained"
                  style={{ backgroundColor: '#000', color: '#fff' }}
                  busy={xLoading}
                  onClick={async () => {
                    const openUrl = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`)
                    await handleClick(openUrl, 'x')
                  }}
                  startIcon={<XTwitterSvgIcon width="20px" />}
                >
                  Share on X (Twitter)
                </ButtonEx>
                <ButtonEx
                  busy={fbLoading}
                  variant="contained"
                  style={{ backgroundColor: '#4267b2', color: '#fff' }}
                  onClick={async () => {
                    const openUrl = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
                    await handleClick(openUrl, 'fb')
                  }}
                  startIcon={<FacebookSvgIcon />}
                >
                  Share on Facebook
                </ButtonEx>
              </>
            )
          : null}
      </FlexRow>
      <ErrorRender error={error} scope="SocialButtonsFlexbox" />
    </FlexGrowCol>
  )
}

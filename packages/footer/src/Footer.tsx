import { Container, Grid } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { useState } from 'react'

import { Copyright } from './Copyright'
import { DeveloperLinks } from './DeveloperLinks'
import { MoreLinks } from './MoreLinks'
import { NetworkLinks } from './NetworkLinks'
import { SocialLinks } from './SocialLinks'
import { SupportLinks } from './SupportLinks'
import { XyoTokens } from './XyoTokens'

export interface FooterProps extends FlexBoxProps {
  dynamicHeight?: boolean
  footerHtmlElement?: boolean
}

export const Footer: React.FC<FooterProps> = ({ dynamicHeight = false, ...props }) => {
  const [more, setMore] = useState(false)
  const onMore = () => {
    setMore(!more)
  }
  return (
    <FlexCol
      onMouseLeave={() => {
        setMore(false)
      }}
      alignItems="stretch"
      {...props}
    >
      {more || !dynamicHeight ? (
        <FlexRow alignItems="flex-start">
          <Container>
            <Grid container justifyContent="space-between" alignItems="flex-start">
              <Grid item xs={12} md={2}>
                <SocialLinks alignItems="flex-start" />
              </Grid>
              <Grid item xs={6} md={2}>
                <NetworkLinks alignItems="flex-start" />
              </Grid>
              <Grid item xs={6} md={2}>
                <XyoTokens alignItems="flex-start" />
              </Grid>
              <Grid item xs={6} md={2}>
                <DeveloperLinks alignItems="flex-start" />
              </Grid>
              <Grid item xs={6} md={2}>
                <MoreLinks alignItems="flex-start" />
              </Grid>
              <Grid item xs={6} md={2}>
                <SupportLinks alignItems="flex-start" />
              </Grid>
            </Grid>
          </Container>
        </FlexRow>
      ) : null}
      <FlexRow>
        <Container>
          <Copyright onMore={onMore} />
        </Container>
      </FlexRow>
    </FlexCol>
  )
}

import { Grid } from '@mui/material'
import React from 'react'

import { Footer, FooterProps } from '../Footer.js'
import { copyrightLinkTitle } from '../lib/index.js'
import { DeveloperLinks } from './DeveloperLinks.js'
import { MoreLinks } from './MoreLinks.js'
import { NetworkLinks } from './NetworkLinks.js'
import { SocialLinks } from './SocialLinks.js'
import { SupportLinks } from './SupportLinks.js'
import { TokenLinks } from './TokenLinks.js'

const footerLinks = [
  {
    href: 'https://xylabs.com/',
    title: copyrightLinkTitle('XY Labs, Inc.'),
  },
  {
    href: 'https://xyo.network/',
    title: 'XYO Foundation',
  },
  {
    href: 'https://xylabs.com/privacy/',
    title: 'Privacy',
  },
  {
    href: 'https://xylabs.com/terms/',
    title: 'Terms',
  },
  {
    href: 'https://xylabs.com/jobs',
    title: 'Careers',
  },
]

export const XyoFooter: React.FC<FooterProps> = ({
  alwaysFooterLinksProps,

  ...props
}) => {
  return (
    <Footer alwaysFooterLinksProps={alwaysFooterLinksProps ?? { footerLinks }} {...props}>
      <Grid container>
        <Grid item xs={12} md={2}>
          <SocialLinks alignItems="flex-start" />
        </Grid>
        <Grid item xs={6} md={2}>
          <NetworkLinks alignItems="flex-start" />
        </Grid>
        <Grid item xs={6} md={2}>
          <TokenLinks alignItems="flex-start" />
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
    </Footer>
  )
}

import { Grid } from '@mui/material'
import React from 'react'

import { Footer, FooterProps } from '../Footer.tsx'
import { copyrightLinkTitle } from '../lib/index.ts'
import { DeveloperLinks } from './DeveloperLinks.tsx'
import { MoreLinks } from './MoreLinks.tsx'
import { NetworkLinks } from './NetworkLinks.tsx'
import { SocialLinks } from './SocialLinks.tsx'
import { SupportLinks } from './SupportLinks.tsx'
import { TokenLinks } from './TokenLinks.tsx'

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

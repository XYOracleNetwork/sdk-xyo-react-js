import { Grid } from '@mui/material'

import { Footer, FooterProps } from '../Footer'
import { copyrightLinkTitle } from '../lib'
import { DeveloperLinks } from './DeveloperLinks'
import { MoreLinks } from './MoreLinks'
import { NetworkLinks } from './NetworkLinks'
import { SocialLinks } from './SocialLinks'
import { SupportLinks } from './SupportLinks'
import { TokenLinks } from './TokenLinks'

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
  alwaysFooterLinksProps = { footerLinks },

  ...props
}) => {
  return (
    <Footer alwaysFooterLinksProps={alwaysFooterLinksProps} {...props}>
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

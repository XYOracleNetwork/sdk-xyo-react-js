import { Grid } from '@mui/material'

import { Footer, FooterProps } from '../Footer'
import { copyrightLinkTitle } from '../lib'
import { XyoDeveloperLinks } from './DeveloperLinks'
import { XyoMoreLinks } from './MoreLinks'
import { XyoNetworkLinks } from './NetworkLinks'
import { XyoSocialLinks } from './SocialLinks'
import { XyoSupportLinks } from './SupportLinks'
import { XyoTokenLinks } from './TokenLinks'

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
          <XyoSocialLinks alignItems="flex-start" />
        </Grid>
        <Grid item xs={6} md={2}>
          <XyoNetworkLinks alignItems="flex-start" />
        </Grid>
        <Grid item xs={6} md={2}>
          <XyoTokenLinks alignItems="flex-start" />
        </Grid>
        <Grid item xs={6} md={2}>
          <XyoDeveloperLinks alignItems="flex-start" />
        </Grid>
        <Grid item xs={6} md={2}>
          <XyoMoreLinks alignItems="flex-start" />
        </Grid>
        <Grid item xs={6} md={2}>
          <XyoSupportLinks alignItems="flex-start" />
        </Grid>
      </Grid>
    </Footer>
  )
}

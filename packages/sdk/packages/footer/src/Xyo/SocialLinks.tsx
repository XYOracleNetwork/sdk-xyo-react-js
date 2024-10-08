import {
  Facebook, Instagram, LinkedIn, Reddit, Telegram, Twitter, YouTube,
} from '@mui/icons-material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import React from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { FaDiscord } from 'react-icons/fa'

import { FooterLink } from '../Link.tsx'
import { FooterLinks } from '../Links.tsx'

export const SocialLinks: React.FC<FlexBoxProps> = (props) => {
  return (
    <FooterLinks title="XYO Socials" {...props}>
      <FlexRow flexWrap="wrap" justifyContent="flex-start">
        <FooterLink href="https://business.facebook.com/OfficialXYO/">
          <Facebook />
        </FooterLink>
        <FooterLink href="https://twitter.com/OfficialXYO">
          <Twitter />
        </FooterLink>
        <FooterLink href="https://www.instagram.com/officialxyo/">
          <Instagram />
        </FooterLink>
        <FooterLink href="https://t.me/xyonetwork">
          <Telegram />
        </FooterLink>
        <FooterLink href="https://www.reddit.com/r/XYONetwork/">
          <Reddit />
        </FooterLink>
        <FooterLink href="https://www.youtube.com/channel/UCyZDqb9pgntVHJVt1pxXtsw">
          <YouTube />
        </FooterLink>
        <FooterLink href="https://www.linkedin.com/company/officialxyo/">
          <LinkedIn />
        </FooterLink>
        <FooterLink href="https://discord.gg/officialxyo">
          <FaDiscord />
        </FooterLink>
      </FlexRow>
    </FooterLinks>
  )
}

import { FlexBoxProps } from '@xylabs/react-flexbox'
import React from 'react'

import { FooterLink } from '../Link.tsx'
import { FooterLinks } from '../Links.tsx'

export const MoreLinks: React.FC<FlexBoxProps> = props => (
  <FooterLinks title="More" {...props}>
    <FooterLink href="https://xyo.network/partners">Partners</FooterLink>
    <FooterLink href="https://xyo.network/fhr">FHR</FooterLink>
    <FooterLink href="https://xyo.network/brand">Brand</FooterLink>
  </FooterLinks>
)

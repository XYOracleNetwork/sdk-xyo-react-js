import type { FlexBoxProps } from '@xylabs/react-flexbox'
import React from 'react'

import { FooterLink } from '../Link.tsx'
import { FooterLinks } from '../Links.tsx'

export const SupportLinks: React.FC<FlexBoxProps> = props => (
  <FooterLinks title="Support" {...props}>
    <FooterLink href="https://support.xy.company/hc/en-us/categories/360001417734">Help Center</FooterLink>
    <FooterLink href="https://support.xy.company/hc/en-us/requests/new">Contact Support</FooterLink>
  </FooterLinks>
)

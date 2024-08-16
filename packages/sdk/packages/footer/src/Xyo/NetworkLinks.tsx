import type { FlexBoxProps } from '@xylabs/react-flexbox'
import React from 'react'

import { FooterLink } from '../Link.tsx'
import { FooterLinks } from '../Links.tsx'

export const NetworkLinks: React.FC<FlexBoxProps> = props => (
  <FooterLinks title="Network" {...props}>
    <FooterLink href="https://xyo.network/network">Overview</FooterLink>
    <FooterLink href="https://xyo.network/network/bound-witness">Bound Witness</FooterLink>
    <FooterLink href="https://xyo.network/network/proof-of-origin">Proof Of Origin</FooterLink>
    <FooterLink href="https://xyo.network/papers">White Paper</FooterLink>
  </FooterLinks>
)

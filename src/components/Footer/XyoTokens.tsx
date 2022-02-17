import { FlexBoxProps } from '@xylabs/sdk-react'
import React from 'react'

import { FooterLink } from './Link'
import { FooterLinks } from './Links'

export const XyoTokens: React.FC<FlexBoxProps> = (props) => (
  <FooterLinks title="XYO Tokens" {...props}>
    <FooterLink href="https://xyo.network/token">About</FooterLink>
    <FooterLink href="https://xyo.network/token">Exchanges</FooterLink>
    <FooterLink href="https://xyo.network/token">Prices</FooterLink>
    <FooterLink href="https://xyo.network/token">Wallets</FooterLink>
    <FooterLink href="https://xyo.network/token">Contract</FooterLink>
  </FooterLinks>
)

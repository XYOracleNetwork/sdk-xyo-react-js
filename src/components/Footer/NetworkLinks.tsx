import { FlexBoxProps } from '@xylabs/sdk-react'

import { FooterLink } from './Link'
import { FooterLinks } from './Links'

export const NetworkLinks: React.FC<FlexBoxProps> = (props) => (
  <FooterLinks title="Network" {...props}>
    <FooterLink href="https://xyo.network/network/components">Components</FooterLink>
    <FooterLink href="https://xyo.network/network/protocol-features">Protocol Features</FooterLink>
    <FooterLink href="https://xyo.network/network/vocabulary">Vocabulary</FooterLink>
  </FooterLinks>
)

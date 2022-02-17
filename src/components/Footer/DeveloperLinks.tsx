import { FlexBoxProps } from '@xylabs/sdk-react'

import { FooterLink } from './Link'
import { FooterLinks } from './Links'

export const DeveloperLinks: React.FC<FlexBoxProps> = (props) => (
  <FooterLinks title="Developer" {...props}>
    <FooterLink href="https://xyo.network/developer/getting-started">Getting Started</FooterLink>
    <FooterLink href="https://xyo.network/developer/sdks">SDKs</FooterLink>
    <FooterLink href="https://github.com/xyoraclenetwork">Open Source Github</FooterLink>
    <FooterLink href="https://xyo.network/developer">Documentation</FooterLink>
  </FooterLinks>
)

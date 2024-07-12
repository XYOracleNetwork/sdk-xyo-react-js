import { FlexBoxProps } from '@xylabs/react-flexbox'

import { FooterLink } from '../Link.js'
import { FooterLinks } from '../Links.js'

export const DeveloperLinks: React.FC<FlexBoxProps> = (props) => (
  <FooterLinks title="Developer" {...props}>
    <FooterLink href="https://xyo.network/developer">Overview</FooterLink>
    <FooterLink href="https://xyo.network/developer/get-started">Get Started</FooterLink>
    <FooterLink href="https://xyo.network/developer">SDKs</FooterLink>
    <FooterLink href="https://github.com/xyoraclenetwork">Open Source Github</FooterLink>
    <FooterLink href="https://xyo.network/docs/sdk/js">Documentation</FooterLink>
  </FooterLinks>
)

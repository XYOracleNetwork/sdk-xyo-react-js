import { FlexBoxProps } from '@xylabs/react-flexbox'

import { FooterLink } from '../Link'
import { FooterLinks } from '../Links'

export const SupportLinks: React.FC<FlexBoxProps> = (props) => (
  <FooterLinks title="Support" {...props}>
    <FooterLink href="https://support.xy.company/hc/en-us/categories/360001417734">Help Center</FooterLink>
    <FooterLink href="https://support.xy.company/hc/en-us/requests/new">Contact Support</FooterLink>
  </FooterLinks>
)

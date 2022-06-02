import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { FlexBoxProps, FlexRow, LinkEx, LinkExProps } from '@xylabs/sdk-react'

import { FooterLink } from './Link'

export interface CopyrightProps extends FlexBoxProps {
  onMore?: () => void
}

const footerLinks: LinkExProps[] = [
  {
    href: 'https://xylabs.com/',
    title: `Copyright © ${new Date().getFullYear()} XY Labs, Inc.`,
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

export const Copyright: React.FC<CopyrightProps> = ({ style, onMore, ...props }) => (
  <FlexRow flexWrap="wrap" textTransform="uppercase" style={{ opacity: 0.6, ...style }} {...props}>
    {footerLinks.map((footerLink, index) => (
      <FooterLink noWrap key={index} paddingX={1} margin={0} {...footerLink}>
        <small>{footerLink.title}</small>
      </FooterLink>
    ))}
    {onMore ? (
      <FlexRow style={{ cursor: 'pointer' }} paddingX={0.5} onClick={onMore}>
        <MoreHorizIcon color="primary" fontSize="small" />
      </FlexRow>
    ) : null}
  </FlexRow>
)

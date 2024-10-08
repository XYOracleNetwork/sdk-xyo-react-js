import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import type { LinkExProps } from '@xylabs/react-link'
import React from 'react'

import { FooterLink } from './Link.tsx'

export interface FooterAlwaysLinksProps extends FlexBoxProps {
  footerLinks?: LinkExProps[]
  onMore?: () => void
}

export const FooterAlwaysLinks: React.FC<FooterAlwaysLinksProps> = ({
  style, footerLinks, onMore, ...props
}) => (
  <FlexRow
    flexWrap="wrap"
    textTransform="uppercase"
    style={{ opacity: 0.6, ...style }}
    {...props}
  >
    {footerLinks?.map((footerLink, index) => (
      <FooterLink noWrap key={index} paddingX={1} margin={0} {...footerLink}>
        <small>{footerLink.title}</small>
      </FooterLink>
    ))}
    {onMore
      ? (
          <FlexRow style={{ cursor: 'pointer' }} paddingX={0.5} onClick={onMore}>
            <MoreHorizIcon color="primary" fontSize="small" />
          </FlexRow>
        )
      : null}
  </FlexRow>
)

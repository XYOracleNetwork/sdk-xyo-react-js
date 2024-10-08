import type { FlexBoxProps } from '@xylabs/react-flexbox'
import React from 'react'

import { FooterAlwaysLinks } from '../AlwaysLinks.tsx'
import { copyrightLinkTitle } from '../lib/index.ts'

export interface XyoFooterAlwaysLinksProps extends FlexBoxProps {
  onMore?: () => void
}

export const XyoFooterAlwaysLinks: React.FC<XyoFooterAlwaysLinksProps> = props => (
  <FooterAlwaysLinks
    footerLinks={[
      {
        href: 'https://xylabs.com/',
        title: copyrightLinkTitle('XY Labs, Inc.'),
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
    ]}
    {...props}
  />
)

/** @deprecated use FooterAlwaysLinksProps */
export type CopyrightProps = XyoFooterAlwaysLinksProps

/** @deprecated use FooterAlwaysLinks */

export { FooterAlwaysLinks as Copyright } from '../AlwaysLinks.tsx'

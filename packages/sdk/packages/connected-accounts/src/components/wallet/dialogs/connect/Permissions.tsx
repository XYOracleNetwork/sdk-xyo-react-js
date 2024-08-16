import { Link, Typography } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

export interface WalletPermissionsFlexBoxProps extends FlexBoxProps {}

export const WalletPermissionsFlexbox: React.FC<WalletPermissionsFlexBoxProps> = (props) => {
  return (
    <FlexCol gap={4} {...props}>
      <Typography fontWeight="bold" sx={{ textAlign: 'center' }}>
        This will allow XYO to:
      </Typography>
      <ul>
        <li>View your wallet account(s) and address(es)</li>
        <li>Read-only access to browse the public blockchain(s) you select</li>
      </ul>
      <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
        You control what accounts to share and what blockchains to view. You can see or revoke access via your wallet&apos;s settings at anytime. View
        more on XYO&apos;s sovereign data philosophy
        {' '}
        <Link
          href="https://cointelegraph.com/innovation-circle/decentralization-and-sovereignty-debunking-our-approach-to-digital-sovereignty"
          sx={{ fontWeight: 'bold' }}
          target="_blank"
        >
          here
        </Link>
        .
      </Typography>
    </FlexCol>
  )
}

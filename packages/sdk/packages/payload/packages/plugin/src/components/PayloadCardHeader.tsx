import type { CardHeaderProps } from '@mui/material'
import { CardHeader } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { usePayloadHash } from '@xyo-network/react-shared'
import React from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

export const PayloadCardHeader: React.FC<PayloadRenderProps & CardHeaderProps> = ({ payload, ...props }) => {
  const hash = usePayloadHash(payload)
  return <CardHeader title="Payload" subheader={hash} avatar={<Identicon size={24} value={hash} />} {...props} />
}

PayloadCardHeader.displayName = 'PayloadCardHeader'

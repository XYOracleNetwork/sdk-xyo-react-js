import { CardHeader, CardHeaderProps } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { usePayloadHash } from '@xyo-network/react-shared'
import { forwardRef } from 'react'

import { PayloadRenderProps } from '../PayloadRenderPlugin.js'

export const PayloadCardHeader = forwardRef<HTMLElement, PayloadRenderProps & CardHeaderProps>(({ payload, ...props }) => {
  const hash = usePayloadHash(payload)
  return <CardHeader title="Payload" subheader={hash} avatar={<Identicon size={24} value={hash} />} {...props} />
})

PayloadCardHeader.displayName = 'PayloadCardHeader'

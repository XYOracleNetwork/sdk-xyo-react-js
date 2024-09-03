import type { CardHeaderProps } from '@mui/material'
import { CardHeader } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { usePayloadHash } from '@xyo-network/react-shared'
import React, { forwardRef } from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

export const PayloadCardHeader = forwardRef<HTMLElement, PayloadRenderProps & CardHeaderProps>(({ payload, ...props }, ref) => {
  const hash = usePayloadHash(payload)
  return <CardHeader ref={ref} title="Payload" subheader={hash} avatar={<Identicon size={24} value={hash} />} {...props} />
})

PayloadCardHeader.displayName = 'PayloadCardHeader'

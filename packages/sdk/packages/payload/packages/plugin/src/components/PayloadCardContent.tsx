import type { CardContentProps } from '@mui/material'
import { CardContent } from '@mui/material'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import React, { forwardRef } from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

export const PayloadCardContent = forwardRef<HTMLDivElement, PayloadRenderProps & CardContentProps>(({ payload, ...props }, ref) => {
  return (
    <CardContent ref={ref} {...props}>
      <PayloadDetails payload={payload} />
    </CardContent>
  )
})

PayloadCardContent.displayName = 'PayloadCardContent'

import type { CardContentProps } from '@mui/material'
import { CardContent } from '@mui/material'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import React, { forwardRef } from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

// eslint-disable-next-line @eslint-react/ensure-forward-ref-using-ref
export const PayloadCardContent = forwardRef<HTMLElement, PayloadRenderProps & CardContentProps>(({
  payload, ...props
}) => {
  return (
    <CardContent {...props}>
      <PayloadDetails payload={payload} />
    </CardContent>
  )
})

PayloadCardContent.displayName = 'PayloadCardContent'

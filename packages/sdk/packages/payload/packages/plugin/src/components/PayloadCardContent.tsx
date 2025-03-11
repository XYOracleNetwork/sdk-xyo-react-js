import type { CardContentProps } from '@mui/material'
import { CardContent } from '@mui/material'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import React from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

export const PayloadCardContent = ({
  ref, payload, ...props
}: PayloadRenderProps & CardContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <CardContent ref={ref} {...props}>
      <PayloadDetails payload={payload} />
    </CardContent>
  )
}

PayloadCardContent.displayName = 'PayloadCardContent'

import { CardContent, CardContentProps } from '@mui/material'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import { forwardRef } from 'react'

import { PayloadRenderProps } from '../PayloadRenderPlugin'

export const PayloadCardContent = forwardRef<HTMLElement, PayloadRenderProps & CardContentProps>(({ payload, ...props }) => {
  return (
    <CardContent {...props}>
      <PayloadDetails payload={payload} />
    </CardContent>
  )
})

PayloadCardContent.displayName = 'PayloadCardContent'

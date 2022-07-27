import { CardContent, CardContentProps } from '@mui/material'
import { XyoPayload } from '@xyo-network/payload'
import { PayloadDetails } from '@xyo-network/react-payload'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

export const XyoPayloadCardContent: React.FC<XyoPayloadRenderProps<XyoPayload> & CardContentProps> = ({ payload, ...props }) => {
  return (
    <CardContent {...props}>
      <PayloadDetails payload={payload} />
    </CardContent>
  )
}

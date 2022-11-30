import { CardContent, CardContentProps } from '@mui/material'
import { PayloadDetails } from '@xyo-network/react-payload-details'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

export const XyoPayloadCardContent: React.FC<XyoPayloadRenderProps & CardContentProps> = ({ payload, ...props }) => {
  return (
    <CardContent {...props}>
      <PayloadDetails payload={payload} />
    </CardContent>
  )
}

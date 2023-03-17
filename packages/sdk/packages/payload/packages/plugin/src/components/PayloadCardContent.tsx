import { CardContent, CardContentProps } from '@mui/material'
import { PayloadDetails } from '@xyo-network/react-payload-details'

import { PayloadRenderProps } from '../PayloadRenderPlugin'

export const PayloadCardContent: React.FC<PayloadRenderProps & CardContentProps> = ({ payload, ...props }) => {
  return (
    <CardContent {...props}>
      <PayloadDetails payload={payload} />
    </CardContent>
  )
}

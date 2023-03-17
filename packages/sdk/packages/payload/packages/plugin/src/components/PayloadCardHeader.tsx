import { CardHeader, CardHeaderProps } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'

import { PayloadRenderProps } from '../PayloadRenderPlugin'

export const PayloadCardHeader: React.FC<PayloadRenderProps & CardHeaderProps> = ({ payload, ...props }) => {
  const wrapper = payload ? new PayloadWrapper(payload) : undefined
  return <CardHeader title="Payload" subheader={wrapper?.hash} avatar={<Identicon size={24} value={wrapper?.hash} />} {...props} />
}

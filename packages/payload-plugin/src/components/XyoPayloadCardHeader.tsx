import { CardHeader, CardHeaderProps } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/payload'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

export const XyoPayloadCardHeader: React.FC<XyoPayloadRenderProps<XyoPayload> & CardHeaderProps> = ({ payload, ...props }) => {
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined
  return <CardHeader title="XyoPayload" subheader={wrapper?.hash} avatar={<Identicon size={24} value={wrapper?.hash} />} {...props} />
}

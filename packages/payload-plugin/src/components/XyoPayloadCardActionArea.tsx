import { CardActionArea, CardActionAreaProps } from '@mui/material'
import { XyoPayload } from '@xyo-network/payload'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const XyoPayloadCardActionArea: React.FC<XyoPayloadRenderProps<XyoPayload> & CardActionAreaProps> = ({ payload, ...props }) => {
  return <CardActionArea {...props} />
}

import { CardActionArea, CardActionAreaProps } from '@mui/material'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const XyoPayloadCardActionArea: React.FC<XyoPayloadRenderProps & CardActionAreaProps> = ({ payload, ...props }) => {
  return <CardActionArea {...props} />
}

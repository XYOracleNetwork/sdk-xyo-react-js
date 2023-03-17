import { CardActionArea, CardActionAreaProps } from '@mui/material'

import { PayloadRenderProps } from '../PayloadRenderPlugin'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PayloadCardActionArea: React.FC<PayloadRenderProps & CardActionAreaProps> = ({ payload, ...props }) => {
  return <CardActionArea {...props} />
}

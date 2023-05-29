import { CardHeader, CardHeaderProps } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { useHash } from '@xyo-network/react-shared'

import { PayloadRenderProps } from '../PayloadRenderPlugin'

export const PayloadCardHeader: React.FC<PayloadRenderProps & CardHeaderProps> = ({ payload, ...props }) => {
  const hash = useHash(payload)
  return <CardHeader title="Payload" subheader={hash} avatar={<Identicon size={24} value={hash} />} {...props} />
}

import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

export const XyoPayloadDetailsBox: React.FC<XyoPayloadRenderProps & FlexBoxProps> = (props) => {
  return <PayloadDetails {...props} />
}

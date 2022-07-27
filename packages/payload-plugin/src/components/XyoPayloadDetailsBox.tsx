import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { PayloadDetails } from '@xyo-network/react-payload'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

export const XyoPayloadDetailsBox: React.FC<XyoPayloadRenderProps<XyoPayload> & FlexBoxProps> = (props) => {
  return <PayloadDetails {...props} />
}

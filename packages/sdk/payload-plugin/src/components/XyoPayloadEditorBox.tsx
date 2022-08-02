import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload'

import { XyoPayloadEditorRenderProps } from '../XyoPayloadRenderPlugin'

export const XyoPayloadEditorBox: React.FC<XyoPayloadEditorRenderProps & FlexBoxProps> = (props) => {
  return <PayloadDetails {...props} />
}

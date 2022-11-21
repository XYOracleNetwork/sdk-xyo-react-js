import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import { forwardRef } from 'react'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

const XyoPayloadDetailsBox = forwardRef<HTMLDivElement, XyoPayloadRenderProps & FlexBoxProps>((props) => {
  return <PayloadDetails {...props} />
})

XyoPayloadDetailsBox.displayName = 'XyoPayloadDetailsBox'
export { XyoPayloadDetailsBox }

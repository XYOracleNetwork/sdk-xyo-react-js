import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import { forwardRef } from 'react'

import { PayloadRenderProps } from '../PayloadRenderPlugin.js'

const PayloadDetailsBox = forwardRef<HTMLDivElement, PayloadRenderProps & FlexBoxProps>((props, ref) => {
  return <PayloadDetails ref={ref} {...props} />
})

PayloadDetailsBox.displayName = 'PayloadDetailsBox'
export { PayloadDetailsBox }

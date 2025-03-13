import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import React from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

const PayloadDetailsBox: React.FC<PayloadRenderProps & FlexBoxProps> = (props) => {
  return <PayloadDetails {...props} />
}

PayloadDetailsBox.displayName = 'PayloadDetailsBox'
export { PayloadDetailsBox }

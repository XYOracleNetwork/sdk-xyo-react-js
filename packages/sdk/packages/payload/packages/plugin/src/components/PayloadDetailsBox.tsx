import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import React from 'react'

import type { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

const PayloadDetailsBox = ({ ref, ...props }: PayloadRenderProps & FlexBoxProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return <PayloadDetails ref={ref} {...props} />
}

PayloadDetailsBox.displayName = 'PayloadDetailsBox'
export { PayloadDetailsBox }

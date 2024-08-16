import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React from 'react'

export const DetailsBox: React.FC<PayloadRenderProps & FlexBoxProps> = (props) => {
  return <PayloadDetails {...props} />
}

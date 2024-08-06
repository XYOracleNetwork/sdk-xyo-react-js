import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import React from 'react'

import { PayloadEditorRenderProps } from '../PayloadRenderPlugin.ts'

export const PayloadEditorBox: React.FC<PayloadEditorRenderProps & FlexBoxProps> = (props) => {
  return <PayloadDetails {...props} />
}

import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import React, { forwardRef } from 'react'

import { PayloadDataDetails } from './DataDetails.js'
import { PayloadJsonDetails } from './JsonDetails.js'
import { PayloadValidationDetails } from './ValidationDetails/index.js'

export type WithPaper<T> = T & { paper: true }
export type WithoutPaper<T> = T & { paper?: false }

export type PayloadDetailsProps = FlexBoxProps & {
  paper?: boolean
  payload?: Payload
}

export const PayloadDetails = forwardRef<HTMLDivElement, PayloadDetailsProps>(({ paper, payload, ...props }, ref) => {
  return (
    <FlexCol gap={1} justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} ref={ref} {...props}>
      <PayloadDataDetails paper={paper} size="large" badge payload={payload} />
      <PayloadValidationDetails paper={paper} value={payload} />
      <PayloadJsonDetails paper={paper} payload={payload} />
    </FlexCol>
  )
})

PayloadDetails.displayName = 'PayloadDetails'

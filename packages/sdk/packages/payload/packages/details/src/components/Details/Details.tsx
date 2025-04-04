import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { Payload } from '@xyo-network/payload-model'
import React from 'react'

import { PayloadDataDetails } from './DataDetails.tsx'
import { PayloadJsonDetails } from './JsonDetails.tsx'
import { PayloadValidationDetails } from './ValidationDetails/index.ts'

export type WithPaper<T> = T & { paper: true }
export type WithoutPaper<T> = T & { paper?: false }

export type PayloadDetailsProps = FlexBoxProps & {
  paper?: boolean
  payload?: Payload
}

export const PayloadDetails: React.FC<PayloadDetailsProps> = ({
  paper, payload, ...props
}) => {
  return (
    <FlexCol gap={1} justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} {...props}>
      <PayloadDataDetails paper={paper} size="large" badge payload={payload} />
      <PayloadValidationDetails paper={paper} value={payload} />
      <PayloadJsonDetails paper={paper} payload={payload} />
    </FlexCol>
  )
}

PayloadDetails.displayName = 'PayloadDetails'

import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { forwardRef } from 'react'

import { PayloadDataDetails } from './DataDetails'
import { PayloadJsonDetails } from './JsonDetails'
import { PayloadValidationDetails } from './ValidationDetails'

export type WithPaper<T> = T & { paper: true }
export type WithoutPaper<T> = T & { paper?: false }

export type PayloadDetailsProps = FlexBoxProps & {
  payload?: XyoPayload
  paper?: boolean
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

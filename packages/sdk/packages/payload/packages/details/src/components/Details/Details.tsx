import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'

import { PayloadDataDetails } from './DataDetails'
import { PayloadJsonDetails } from './JsonDetails'
import { PayloadValidationDetails } from './ValidationDetails'

export type WithPaper<T> = T & { paper: true }
export type WithoutPaper<T> = T & { paper?: false }

export type PayloadDetailsProps = FlexBoxProps & {
  payload?: XyoPayload
  paper?: boolean
}

export const PayloadDetails: React.FC<PayloadDetailsProps> = ({ paper, payload, ...props }) => {
  return (
    <FlexCol gap={1} justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} {...props}>
      <PayloadDataDetails paper={paper} size="large" badge payload={payload} />
      <PayloadValidationDetails paper={paper} value={payload} />
      <PayloadJsonDetails paper={paper} payload={payload} />
    </FlexCol>
  )
}

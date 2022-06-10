import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/core'

import { PayloadDataDetails } from './DataDetails'
import { PayloadJsonDetails } from './JsonDetails'
import { PayloadMetaDetails } from './MetaDetails'
import { PayloadValidationDetails } from './ValidationDetails'

export type WithPaper<T> = T & { paper: true }
export type WithoutPaper<T> = T & { paper?: false }

export type PayloadDetailsProps = FlexBoxProps & {
  payload?: XyoPayload
  paper?: boolean
  archivePath?: string
}

export const PayloadDetails: React.FC<PayloadDetailsProps> = ({ archivePath, paper, payload, ...props }) => {
  return (
    <FlexCol gap={1} justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} {...props}>
      <PayloadDataDetails paper={paper} size="large" badge payload={payload} />
      <PayloadMetaDetails archivePath={archivePath} paper={paper ? true : false} value={payload} />
      <PayloadValidationDetails paper={paper} value={payload} />
      <PayloadJsonDetails paper={paper} payload={payload} />
    </FlexCol>
  )
}

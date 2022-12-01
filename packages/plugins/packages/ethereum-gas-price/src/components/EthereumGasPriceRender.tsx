import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'

import { FeeDataPayload } from './lib'

export const EthereumGasPriceRender: React.FC<XyoPayloadDetailsRenderProps & FlexBoxProps> = ({ ...props }) => {
  const { payload } = props
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined

  if ([!isEmpty(gasPricePayload?.feePerGas), !isEmpty(gasPricePayload?.priorityFeePerGas)].some(Boolean)) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
  }

  return <FlexCol {...props}></FlexCol>
}

import { FlexBoxProps } from '@xylabs/react-flexbox'
import { FeeData } from '@xyo-network/gas-price-payload-plugin'
import { XyoPayload } from '@xyo-network/payload'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'

export const EthereumGasPriceRender: React.FC<XyoPayloadDetailsRenderProps & FlexBoxProps> = ({ ...props }) => {
  const { payload } = props
  const gasPricePayload = payload ? (payload as XyoPayload<FeeData>) : undefined

  if ([!isEmpty(gasPricePayload?.feePerGas), !isEmpty(gasPricePayload?.priorityFeePerGas)].some(Boolean)) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
  }

  return <pre>{JSON.stringify(payload, null, 2)}</pre>
}

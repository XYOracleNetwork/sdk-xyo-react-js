import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'

export const EthereumGasPriceRender: React.FC<XyoPayloadDetailsRenderProps & FlexBoxProps> = ({ ...props }) => {
  const { payload } = props
  // const gasPricePayload = payload ? (payload as ) : undefined

  // if (gasPricePayload === 0) {
  //   return <PayloadDataMissing alertBody="Payload is missing valid Uniswap Pairs." />
  // }

  return <pre>{JSON.stringify(payload, null, 2)}</pre>
}

import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'

export const DetailsBox: React.FC<XyoPayloadRenderProps & FlexBoxProps> = (props) => {
  return <PayloadDetails {...props} />
}

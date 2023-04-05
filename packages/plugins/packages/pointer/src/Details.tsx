import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload-details'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'

export const DetailsBox: React.FC<PayloadRenderProps & FlexBoxProps> = (props) => {
  return <PayloadDetails {...props} />
}

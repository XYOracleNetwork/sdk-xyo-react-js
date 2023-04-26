import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'

import { ForecastPayload } from '../lib'

export interface PriceForecastDetailsBoxProps extends FlexBoxProps {
  payload?: Payload
}

export const PriceForecastDetailsBox: React.FC<PriceForecastDetailsBoxProps> = ({ payload, ...props }) => {
  const priceForecastPayload = payload as ForecastPayload

  return (
    <FlexCol {...props}>
      Hello from PriceForecastDetailsBox: <code>{JSON.stringify(priceForecastPayload)}</code>
    </FlexCol>
  )
}

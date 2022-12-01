import { Grid } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'

import { GasFeeCard } from './Fees'
import { GasPriceEstimateHeaderBox } from './Header'
import { FeeDataPayload, FeePerGasValues } from './lib'

export const EthereumGasPriceRender: React.FC<XyoPayloadDetailsRenderProps & FlexBoxProps> = ({ ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { payload, listMode, ...flexProps } = props

  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined

  if ([isEmpty(gasPricePayload?.feePerGas), isEmpty(gasPricePayload?.priorityFeePerGas)].some(Boolean)) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
  }

  return (
    <FlexCol alignItems="start" rowGap={4} {...flexProps}>
      <GasPriceEstimateHeaderBox timestamp={gasPricePayload?.timestamp} baseFee={gasPricePayload?.baseFee} />
      <Grid container spacing={3}>
        {gasPricePayload &&
          FeePerGasValues.map((value) => (
            <Grid key={value} item xs={12} sm={6} lg={3}>
              <GasFeeCard gasPrice={gasPricePayload?.feePerGas[value]} priorityFee={gasPricePayload.priorityFeePerGas[value]} speed={value} />
            </Grid>
          ))}
      </Grid>
    </FlexCol>
  )
}

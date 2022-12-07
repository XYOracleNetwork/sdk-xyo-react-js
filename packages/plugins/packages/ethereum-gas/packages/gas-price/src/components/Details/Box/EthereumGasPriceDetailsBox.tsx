import { Grid } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { GasFeeCard } from '@xyo-network/react-gas-price'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { FeeDataPayload, FeePerGasToSpeed, FeePerGasValues } from '../../lib'
import { GasPriceEstimateHeaderBox } from './components'

export const EthereumGasPriceDetailsBox = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined

    if ([isEmpty(gasPricePayload?.feePerGas), isEmpty(gasPricePayload?.priorityFeePerGas)].some(Boolean)) {
      return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
    }

    return (
      <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
        <GasPriceEstimateHeaderBox timestamp={gasPricePayload?.timestamp} baseFee={gasPricePayload?.baseFee} />
        <Grid container spacing={3}>
          {gasPricePayload &&
            FeePerGasValues.map((value) => (
              <Grid key={value} item xs={12} sm={6} lg={3}>
                <GasFeeCard
                  gasPrice={gasPricePayload?.feePerGas[value]}
                  priorityFee={gasPricePayload.priorityFeePerGas[value]}
                  speed={FeePerGasToSpeed[value]}
                />
              </Grid>
            ))}
        </Grid>
      </FlexCol>
    )
  },
)

EthereumGasPriceDetailsBox.displayName = 'EthereumGasPriceDetailsBox'

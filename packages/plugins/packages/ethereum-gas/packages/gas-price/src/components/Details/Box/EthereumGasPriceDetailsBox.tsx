import { Grid } from '@mui/material'
import { isEmpty } from '@xylabs/lodash'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { GasFeeCard } from '@xyo-network/react-gas-price'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import { forwardRef } from 'react'

import { FeeDataPayload, FeePerGasToSpeed, FeePerGasValues } from '../../lib/index.js'
import { GasPriceHeaderBox } from './components/index.js'

export const EthereumGasPriceDetailsBox = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload: FeeDataPayload | undefined = payload ? (payload as FeeDataPayload) : undefined

    return (
      <>
        {[isEmpty(gasPricePayload?.feePerGas), isEmpty(gasPricePayload?.priorityFeePerGas)].some(Boolean) ?
          <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
        : <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
            <GasPriceHeaderBox heading={'Gas Fee Estimate'} timestamp={gasPricePayload?.timestamp} baseFee={gasPricePayload?.baseFee} />
            <Grid container spacing={3}>
              {gasPricePayload &&
                FeePerGasValues.map((value) => (
                  <Grid key={value} item xs={12} sm={6} lg={3}>
                    <GasFeeCard
                      gasPrice={gasPricePayload?.feePerGas[value]}
                      priorityFee={gasPricePayload.priorityFeePerGas[value]}
                      speed={FeePerGasToSpeed[value].toUpperCase()}
                    />
                  </Grid>
                ))}
            </Grid>
          </FlexCol>
        }
      </>
    )
  },
)

EthereumGasPriceDetailsBox.displayName = 'EthereumGasPriceDetailsBox'

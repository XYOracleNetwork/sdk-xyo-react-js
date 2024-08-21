import { Grid } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import { GasFeeCard } from '@xyo-network/react-gas-price'
import type { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React, { forwardRef } from 'react'

import type { FeeDataPayload } from '../../lib/index.ts'
import { FeePerGasToSpeed, FeePerGasValues } from '../../lib/index.ts'
import { GasPriceHeaderBox } from './components/index.ts'

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

export const EthereumGasPriceDetailsBox = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & FlexBoxProps>(

  ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    payload, listMode, ...props
  }, ref) => {
    const gasPricePayload: FeeDataPayload | undefined = payload ? (payload as FeeDataPayload) : undefined

    return (
      <>
        {[isEmpty(gasPricePayload?.feePerGas), isEmpty(gasPricePayload?.priorityFeePerGas)].some(Boolean)
          ? <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
          : (
              <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
                <GasPriceHeaderBox heading="Gas Fee Estimate" timestamp={gasPricePayload?.timestamp} baseFee={gasPricePayload?.baseFee} />
                <Grid container spacing={3}>
                  {gasPricePayload
                  && FeePerGasValues.map(value => (
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
            )}
      </>
    )
  },
)

EthereumGasPriceDetailsBox.displayName = 'EthereumGasPriceDetailsBox'

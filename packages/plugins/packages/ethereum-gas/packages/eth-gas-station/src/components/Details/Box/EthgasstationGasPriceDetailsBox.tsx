import { Grid } from '@mui/material'
import { isEmpty } from '@xylabs/lodash'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { EthereumGasEthgasstationPayload } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React, { forwardRef } from 'react'

import { useEthgasstationTransformer } from '../../hooks/index.js'
import { RenderTitle } from '../../lib/index.js'

export const EthgasstationGasPriceDetailsBox = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload: EthereumGasEthgasstationPayload | undefined = payload ? (payload as EthereumGasEthgasstationPayload) : undefined
    const parsedPayload = useEthgasstationTransformer(gasPricePayload)

    return (
      <>
        {isEmpty(gasPricePayload) || isEmpty(gasPricePayload.gasPrice)
          ? <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
          : (
              <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
                <GasPriceWitnessHeaderBox heading={RenderTitle} parsedPayload={parsedPayload} />
                <Grid container spacing={3}>
                  {parsedPayload
                  && parsedPayload?.gasPrice?.map(({ price, priorityFee }) => (
                    <Grid key={price?.label} item xs={12} sm={6} lg={4}>
                      <GasFeeCard
                        key={price?.label}
                        gasPrice={price?.value}
                        speed={price?.label}
                        priorityFee={priorityFee?.value}
                        priorityFeeLabel={priorityFee?.label}
                      />
                    </Grid>
                  ))}
                </Grid>
                <ToggleRawPayloadBox gasPricePayload={gasPricePayload} alignItems="start" />
              </FlexCol>
            )}
      </>
    )
  },
)

EthgasstationGasPriceDetailsBox.displayName = 'EthgasstationGasPriceDetailsBox'

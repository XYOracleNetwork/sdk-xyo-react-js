import { Grid } from '@mui/material'
import { isEmpty } from '@xylabs/lodash'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { EthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React, { forwardRef } from 'react'

import { useEtherscanTransformer } from '../../hooks/index.ts'
import { RenderTitle } from '../../lib/index.ts'

export const EtherscanGasPriceDetailsBox = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload = payload ? (payload as EthereumGasEtherscanPayload) : undefined
    const parsedPayload = useEtherscanTransformer(gasPricePayload)

    return (
      <>
        {isEmpty(gasPricePayload) || gasPricePayload.status !== '1'
          ? <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
          : (
              <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
                <GasPriceWitnessHeaderBox heading={RenderTitle} parsedPayload={parsedPayload} />
                <Grid container spacing={3}>
                  {parsedPayload
                  && parsedPayload?.gasPrice?.map(({ price }) => (
                    <Grid key={price?.label} item xs={12} sm={6} lg={4}>
                      <GasFeeCard gasPrice={price?.value} speed={price?.label} />
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

EtherscanGasPriceDetailsBox.displayName = 'EtherscanGasPriceDetailsBox'

import { Grid } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoEthereumGasBlocknativePayload } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { useBlocknativeTransformer } from '../../hooks'
import { RenderTitle } from '../../lib'

export const BlocknativeGasPriceDetailsBox = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload: XyoEthereumGasBlocknativePayload | undefined = payload ? (payload as XyoEthereumGasBlocknativePayload) : undefined
    const parsedPayload = useBlocknativeTransformer(gasPricePayload)

    return (
      <>
        {isEmpty(gasPricePayload) || !gasPricePayload.blockPrices?.length ? (
          <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
        ) : (
          <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
            <GasPriceWitnessHeaderBox heading={RenderTitle} parsedPayload={parsedPayload} />
            <Grid container spacing={3} columns={{ lg: 15, md: 15, sm: 12, xs: 12 }}>
              {parsedPayload &&
                parsedPayload?.gasPrice?.map(({ price, priorityFee }) => (
                  <Grid key={price?.label} item xs={12} sm={6} md={5} lg={3}>
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

BlocknativeGasPriceDetailsBox.displayName = 'BlocknativeGasPriceDetailsBox'

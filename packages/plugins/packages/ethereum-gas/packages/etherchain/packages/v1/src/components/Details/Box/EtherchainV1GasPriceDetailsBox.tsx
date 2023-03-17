import { Grid } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoEthereumGasEtherchainV1Payload } from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import { GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { useEtherchainV1Transformer } from '../../hooks'
import { RenderTitle } from '../../lib'

export const EtherchainV1GasPriceDetailsBox = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload: XyoEthereumGasEtherchainV1Payload | undefined = payload ? (payload as XyoEthereumGasEtherchainV1Payload) : undefined
    const parsedPayload = useEtherchainV1Transformer(gasPricePayload)

    return (
      <>
        {isEmpty(gasPricePayload) || !gasPricePayload.standard ? (
          <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
        ) : (
          <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
            <GasPriceWitnessHeaderBox heading={RenderTitle} parsedPayload={parsedPayload} />
            <Grid container spacing={3}>
              {parsedPayload &&
                parsedPayload?.gasPrice?.map(({ price, priorityFee }) => (
                  <Grid key={price?.label} item xs={12} sm={6} lg={3}>
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

EtherchainV1GasPriceDetailsBox.displayName = 'EtherchainV1GasPriceDetailsBox'

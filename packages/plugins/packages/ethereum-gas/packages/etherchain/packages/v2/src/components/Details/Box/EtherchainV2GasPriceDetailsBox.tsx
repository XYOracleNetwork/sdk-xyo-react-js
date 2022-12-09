import { Grid } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoEthereumGasEtherchainV2Payload } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { useEtherchainV2Transformer } from '../../hooks'
import { RenderTitle } from '../../lib'

export const EtherchainV2GasPriceDetailsBox = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload: XyoEthereumGasEtherchainV2Payload | undefined = payload ? (payload as XyoEthereumGasEtherchainV2Payload) : undefined
    const parsedPayload = useEtherchainV2Transformer(gasPricePayload)

    return (
      <>
        {isEmpty(gasPricePayload) || !gasPricePayload.data?.standard ? (
          <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
        ) : (
          <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
            <GasPriceWitnessHeaderBox heading={RenderTitle} parsedPayload={parsedPayload} />
            <Grid container spacing={3}>
              {parsedPayload &&
                parsedPayload?.gasPrice?.map(({ price, priorityFee }) => (
                  <Grid key={price?.label} item xs={22} sm={6} lg={3}>
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

EtherchainV2GasPriceDetailsBox.displayName = 'EtherchainV2GasPriceDetailsBox'

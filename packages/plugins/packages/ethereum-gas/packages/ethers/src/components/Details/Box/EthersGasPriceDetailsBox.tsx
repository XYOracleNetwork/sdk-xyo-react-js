import { Grid } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoEthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { GasFeeCard, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { useEthersTransformer } from '../../hooks'
import { RenderTitle } from '../../lib'
import { GasPriceEthersHeaderBox } from './components'

export const EthersGasPriceDetailsBox = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload = payload ? (payload as XyoEthereumGasEthersPayload) : undefined
    const parsedPayload = useEthersTransformer(gasPricePayload)

    if (isEmpty(gasPricePayload) || !gasPricePayload.maxFeePerGas) {
      return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
    }

    return (
      <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
        <GasPriceEthersHeaderBox
          heading={RenderTitle}
          timestamp={parsedPayload?.timestamp}
          baseFee={parsedPayload?.baseFee?.value}
          baseFeeLabel={parsedPayload?.baseFee?.label}
          blockNumber={parsedPayload?.blockNumber?.value}
          blockNumberLabel={parsedPayload?.blockNumber?.label}
        />
        <Grid container spacing={3}>
          {parsedPayload &&
            parsedPayload?.gasPrice?.map(({ price, priorityFee }) => (
              <Grid key={price?.label} item xs={12} sm={6} lg={4}>
                <GasFeeCard gasPrice={price?.value} speed={price?.label} priorityFee={priorityFee?.value} priorityFeeLabel={priorityFee?.label} />
              </Grid>
            ))}
        </Grid>
        <ToggleRawPayloadBox gasPricePayload={gasPricePayload} alignItems="start" />
      </FlexCol>
    )
  },
)

EthersGasPriceDetailsBox.displayName = 'EthersGasPriceDetailsBox'

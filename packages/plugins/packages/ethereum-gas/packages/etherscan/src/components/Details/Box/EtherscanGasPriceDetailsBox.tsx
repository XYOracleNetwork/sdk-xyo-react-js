import { Grid } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoEthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { GasFeeCard, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { useEtherscanTransformer } from '../hooks'
import { GasPriceEtherscanHeaderBox } from './components'

export const EtherscanGasPriceDetailsBox = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload = payload ? (payload as XyoEthereumGasEtherscanPayload) : undefined
    const parsedPayload = useEtherscanTransformer(gasPricePayload)

    if (isEmpty(gasPricePayload) || gasPricePayload.status !== 'OK') {
      return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
    }

    return (
      <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
        <GasPriceEtherscanHeaderBox
          heading={'Etherscan Gas Tracker'}
          timestamp={parsedPayload?.timestamp}
          baseFee={parsedPayload?.baseFee?.value}
          baseFeeLabel={parsedPayload?.baseFee?.label}
        />
        <Grid container spacing={3}>
          {parsedPayload &&
            parsedPayload?.gasPrice?.map(({ price }) => (
              <Grid key={price?.label} item xs={12} sm={6} lg={3}>
                <GasFeeCard gasPrice={price?.value} speed={price?.label} />
              </Grid>
            ))}
        </Grid>
        <ToggleRawPayloadBox gasPricePayload={gasPricePayload} />
      </FlexCol>
    )
  },
)

EtherscanGasPriceDetailsBox.displayName = 'EtherscanGasPriceDetailsBox'

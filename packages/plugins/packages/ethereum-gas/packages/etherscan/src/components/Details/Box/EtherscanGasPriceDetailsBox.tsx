import { Button, Collapse, Grid, Paper } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoEthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { GasFeeCard } from '@xyo-network/react-gas-price'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef, useState } from 'react'

import { useEtherscanTransformer } from '../hooks'
import { GasPriceEtherscanHeaderBox } from './components'

export const EtherscanGasPriceDetailsBox = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const [collapse, setCollapse] = useState(false)
    const gasPricePayload = payload ? (payload as XyoEthereumGasEtherscanPayload) : undefined
    const parsedPayload = useEtherscanTransformer(gasPricePayload)

    if (isEmpty(gasPricePayload)) {
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
        <FlexCol rowGap={1}>
          <Button variant="contained" onClick={() => setCollapse(!collapse)}>
            Toggle Raw Payload
          </Button>
          <Collapse in={collapse}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <pre>{JSON.stringify(gasPricePayload, null, 2)}</pre>
            </Paper>
          </Collapse>
        </FlexCol>
      </FlexCol>
    )
  },
)

EtherscanGasPriceDetailsBox.displayName = 'EtherscanGasPriceDetailsBox'

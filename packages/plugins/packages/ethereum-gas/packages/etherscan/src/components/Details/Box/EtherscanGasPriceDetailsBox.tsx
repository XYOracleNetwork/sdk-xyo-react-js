import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { XyoEthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

export const EtherscanGasPriceDetailsBox = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload = payload ? (payload as XyoEthereumGasEtherscanPayload) : undefined

    if (isEmpty(gasPricePayload)) {
      return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
    }

    return <FlexGrowCol {...props}>{JSON.stringify(gasPricePayload, null, 2)}</FlexGrowCol>

    // return (
    //   <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
    //     <GasPriceEstimateHeaderBox timestamp={gasPricePayload?.timestamp} baseFee={gasPricePayload?.baseFee} />
    //     <Grid container spacing={3}>
    //       {gasPricePayload &&
    //         FeePerGasValues.map((value) => (
    //           <Grid key={value} item xs={12} sm={6} lg={3}>
    //             <GasFeeCard
    //               gasPrice={gasPricePayload?.feePerGas[value]}
    //               priorityFee={gasPricePayload.priorityFeePerGas[value]}
    //               speed={FeePerGasToSpeed[value]}
    //             />
    //           </Grid>
    //         ))}
    //     </Grid>
    //   </FlexCol>
    // )
  },
)

EtherscanGasPriceDetailsBox.displayName = 'EtherscanGasPriceDetailsBox'

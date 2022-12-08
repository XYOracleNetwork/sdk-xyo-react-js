import { Grid } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoEthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'
import { forwardRef } from 'react'

import { useEthersTransformer } from '../../hooks'
import { RenderTitle } from '../../lib'

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
        <GasPriceWitnessHeaderBox heading={RenderTitle} parsedPayload={parsedPayload} />
        {parsedPayload &&
          parsedPayload?.gasPrice?.map(({ price, priorityFee }) => (
            <GasFeeCard
              key={price?.label}
              gasPrice={price?.value}
              speed={price?.label}
              priorityFee={priorityFee?.value}
              priorityFeeLabel={priorityFee?.label}
            />
          ))}
        <ToggleRawPayloadBox gasPricePayload={gasPricePayload} alignItems="start" />
      </FlexCol>
    )
  },
)

EthersGasPriceDetailsBox.displayName = 'EthersGasPriceDetailsBox'

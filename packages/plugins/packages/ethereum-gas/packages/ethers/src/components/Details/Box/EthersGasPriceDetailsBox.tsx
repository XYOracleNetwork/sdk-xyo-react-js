import { isEmpty } from '@xylabs/lodash'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { EthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox } from '@xyo-network/react-gas-price'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import { forwardRef } from 'react'

import { useEthersTransformer } from '../../hooks/index.js'
import { RenderTitle } from '../../lib/index.js'

export const EthersGasPriceDetailsBox = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & FlexBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, listMode, ...props }, ref) => {
    const gasPricePayload = payload ? (payload as EthereumGasEthersPayload) : undefined
    const parsedPayload = useEthersTransformer(gasPricePayload)

    return (
      <>
        {isEmpty(gasPricePayload) || !gasPricePayload.maxFeePerGas ?
          <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
        : <FlexCol alignItems="start" rowGap={4} {...props} ref={ref}>
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
        }
      </>
    )
  },
)

EthersGasPriceDetailsBox.displayName = 'EthersGasPriceDetailsBox'

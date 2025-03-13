import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { EthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import {
  GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox,
} from '@xyo-network/react-gas-price'
import type { PayloadDetailsListRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React from 'react'

import { getEthersTransformer } from '../../hooks/index.ts'
import { RenderTitle } from '../../lib/index.ts'

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

export const EthersGasPriceDetailsBox: React.FC<PayloadDetailsListRenderProps & FlexBoxProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  payload, listMode, ...props
}) => {
  const gasPricePayload = payload ? (payload as EthereumGasEthersPayload) : undefined
  const parsedPayload = getEthersTransformer(gasPricePayload)

  return (
    <>
      {isEmpty(gasPricePayload) || !gasPricePayload?.maxFeePerGas
        ? <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
        : (
            <FlexCol alignItems="start" rowGap={4} {...props}>
              <GasPriceWitnessHeaderBox heading={RenderTitle} parsedPayload={parsedPayload} />
              {parsedPayload
                && parsedPayload?.gasPrice?.map(({ price, priorityFee }) => (
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
          )}
    </>
  )
}

EthersGasPriceDetailsBox.displayName = 'EthersGasPriceDetailsBox'

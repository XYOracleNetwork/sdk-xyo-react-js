import { Grid } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { EthereumGasEthgasstationPayload } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import {
  GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox,
} from '@xyo-network/react-gas-price'
import type { PayloadDetailsListRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React from 'react'

import { getEthgasstationTransformer } from '../../hooks/index.ts'
import { RenderTitle } from '../../lib/index.ts'

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

export const EthgasstationGasPriceDetailsBox: React.FC<PayloadDetailsListRenderProps & FlexBoxProps> = ({

  payload, listMode, ...props
}) => {
  const gasPricePayload: EthereumGasEthgasstationPayload | undefined = payload ? (payload as EthereumGasEthgasstationPayload) : undefined
  const parsedPayload = getEthgasstationTransformer(gasPricePayload)

  return (
    <>
      {isEmpty(gasPricePayload) || isEmpty(gasPricePayload?.gasPrice)
        ? <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
        : (
            <FlexCol alignItems="start" rowGap={4} {...props}>
              <GasPriceWitnessHeaderBox heading={RenderTitle} parsedPayload={parsedPayload} />
              <Grid container spacing={3}>
                {parsedPayload
                  && parsedPayload?.gasPrice?.map(({ price, priorityFee }) => (
                    <Grid
                      key={price?.label}
                      size={{
                        xs: 12, sm: 6, lg: 4,
                      }}
                    >
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
}

EthgasstationGasPriceDetailsBox.displayName = 'EthgasstationGasPriceDetailsBox'

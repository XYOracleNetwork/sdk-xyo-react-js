import { Grid } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { EthereumGasBlocknativePayload } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import {
  GasFeeCard, GasPriceWitnessHeaderBox, ToggleRawPayloadBox,
} from '@xyo-network/react-gas-price'
import type { PayloadDetailsListRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React from 'react'

import { getBlocknativeTransformer } from '../../hooks/index.ts'
import { RenderTitle } from '../../lib/index.ts'

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

export const BlocknativeGasPriceDetailsBox: React.FC<PayloadDetailsListRenderProps & FlexBoxProps> = ({

  payload, listMode, ...props
}) => {
  const gasPricePayload: EthereumGasBlocknativePayload | undefined = payload ? (payload as EthereumGasBlocknativePayload) : undefined
  const parsedPayload = getBlocknativeTransformer(gasPricePayload)

  return (
    <>
      {isEmpty(gasPricePayload) || !gasPricePayload?.blockPrices?.length
        ? <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
        : (
            <FlexCol alignItems="start" rowGap={4} {...props}>
              <GasPriceWitnessHeaderBox heading={RenderTitle} parsedPayload={parsedPayload} />
              <Grid
                container
                spacing={3}
                columns={{
                  lg: 15, md: 15, sm: 12, xs: 12,
                }}
              >
                {parsedPayload
                  && parsedPayload?.gasPrice?.map(({ price, priorityFee }) => (
                    <Grid
                      key={price?.label}
                      size={{
                        xs: 12, sm: 6, md: 5, lg: 3,
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

BlocknativeGasPriceDetailsBox.displayName = 'BlocknativeGasPriceDetailsBox'

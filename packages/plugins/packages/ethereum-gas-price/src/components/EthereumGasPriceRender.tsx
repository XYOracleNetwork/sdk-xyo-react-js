import { Chip, Grid, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing, TypographyEx, useGetTokenData } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'

import { GasFeeCard } from './Fees'
import { FeeDataPayload, FeePerGasValues } from './lib'

export const EthereumGasPriceRender: React.FC<XyoPayloadDetailsRenderProps & FlexBoxProps> = ({ ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { payload, listMode, ...flexProps } = props
  const theme = useTheme()
  const gasPricePayload = payload ? (payload as FeeDataPayload) : undefined

  const [ethData] = useGetTokenData(['eth'])

  if ([isEmpty(gasPricePayload?.feePerGas), isEmpty(gasPricePayload?.priorityFeePerGas)].some(Boolean)) {
    return <PayloadDataMissing alertBody="Payload is missing valid gas fee data." />
  }

  return (
    <FlexCol alignItems="start" rowGap={4} {...flexProps}>
      <FlexRow justifyItems="space-between" alignItems="end" columnGap={2} rowGap={2} flexWrap="wrap" width="100%" justifyContent="space-between">
        <TypographyEx fontSize={theme.spacing(6)} lineHeight={1}>
          Gas Fee Estimate <img height={theme.spacing(4)} src={ethData.icon} />
        </TypographyEx>
        <FlexRow columnGap={1}>
          {gasPricePayload?.timestamp ? <Chip label={gasPricePayload.timestamp} /> : null}
          {gasPricePayload?.baseFee ? <Chip label={`Base Fee - ${gasPricePayload.baseFee}`} /> : null}
        </FlexRow>
      </FlexRow>
      <FlexRow columnGap={2} flexWrap="wrap" rowGap={2} width="100%" justifyContent="space-between">
        <Grid container spacing={3}>
          {gasPricePayload &&
            FeePerGasValues.map((value) => (
              <Grid key={value} item md={6} lg={3}>
                <GasFeeCard gasPrice={gasPricePayload?.feePerGas[value]} priorityFee={gasPricePayload.priorityFeePerGas[value]} speed={value} />
              </Grid>
            ))}
        </Grid>
      </FlexRow>
    </FlexCol>
  )
}

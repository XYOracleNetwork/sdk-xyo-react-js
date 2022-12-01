import { Chip, Grid, Link, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing, TypographyEx, useGetTokenData } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'

import { GasFeeCard } from './Fees'
import { FeeDataPayload, FeePerGasValues } from './lib'

const DivinationDescription: React.FC = () => (
  <QuickTipButton hoverText="More Info">
    <TypographyEx>
      Ethereum gas price estimates derived by combining pricing from Blocknative, Etherchain, Ethers, and Etherscan. Learn more about recent changes
      to gas fees on Ethereum{' '}
      <Link href="https://www.blocknative.com/blog/eip-1559-fees" target="_blank" rel="nofollow">
        here.
      </Link>
    </TypographyEx>
  </QuickTipButton>
)

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
          Gas Fee Estimate <img height={theme.spacing(4)} src={ethData.icon} />{' '}
          <span style={{ lineHeight: 0, verticalAlign: 'super' }}>
            <DivinationDescription />
          </span>
        </TypographyEx>
        <FlexRow columnGap={1}>
          {gasPricePayload?.timestamp ? <Chip label={new Date(gasPricePayload.timestamp).toLocaleString()} /> : null}
          {gasPricePayload?.baseFee ? <Chip label={`Base Fee - ${gasPricePayload.baseFee.toFixed(2)}`} /> : null}
        </FlexRow>
      </FlexRow>
      <FlexRow rowGap={2} width="100%" justifyContent="space-between">
        <Grid container spacing={3}>
          {gasPricePayload &&
            FeePerGasValues.map((value) => (
              <Grid key={value} item xs={12} sm={6} lg={3}>
                <GasFeeCard gasPrice={gasPricePayload?.feePerGas[value]} priorityFee={gasPricePayload.priorityFeePerGas[value]} speed={value} />
              </Grid>
            ))}
        </Grid>
      </FlexRow>
    </FlexCol>
  )
}

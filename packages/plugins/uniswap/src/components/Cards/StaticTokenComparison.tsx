import { Divider, PaperProps, useTheme } from '@mui/material'
import { FlexCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { TokenBar, TokenSummary, useGetTokenData } from '@xyo-network/react-shared'
import { XyoUniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'

interface StaticTokenSummaryProps {
  tokenPayload: XyoUniswapCryptoPair
}

const formattedPrice = (price: number) => {
  if (price < 1) {
    return price.toFixed(9)
  } else {
    return price.toFixed(2)
  }
}

export const StaticTokenComparison: React.FC<StaticTokenSummaryProps> = ({ tokenPayload }) => {
  const theme = useTheme()
  const isLightMode = theme.palette.mode !== 'dark'
  const [tokenInfo0, tokenInfo1] = useGetTokenData([tokenPayload.tokens[0].symbol, tokenPayload.tokens[1].symbol])
  const [token0, token1] = tokenPayload.tokens
  const imgBgProps: PaperProps = {
    elevation: isLightMode ? 1 : 3,
    sx: {
      bgcolor: isLightMode ? '#F6F5FA' : 'inherit',
    },
    variant: 'elevation',
  }

  return (
    <FlexCol justifyContent="flex-start" alignItems="stretch" padding={0.5}>
      <TokenSummary {...token0} icon={tokenInfo0.icon} imgBgProps={imgBgProps}>
        <TokenBar text1={token0.value.toFixed(6)} text2={token1.symbol} text1Props={{ title: token0.value.toString() }} {...imgBgProps} />
      </TokenSummary>
      <FlexGrowRow paddingY={2}>
        <Divider variant="fullWidth" />
      </FlexGrowRow>
      <TokenSummary {...token1} icon={tokenInfo1.icon} imgBgProps={imgBgProps}>
        <TokenBar text1={formattedPrice(token1.value)} text1Props={{ title: token1.value.toString() }} text2={token0.symbol} {...imgBgProps} />
      </TokenSummary>
    </FlexCol>
  )
}

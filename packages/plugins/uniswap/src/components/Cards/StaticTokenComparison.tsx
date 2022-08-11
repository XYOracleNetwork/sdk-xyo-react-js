import { Paper, PaperProps, useTheme } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
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
  const isLightMode = theme.palette.mode === 'light'
  const [tokenInfo0, tokenInfo1] = useGetTokenData([tokenPayload.tokens[0].symbol, tokenPayload.tokens[1].symbol])
  const [token0, token1] = tokenPayload.tokens

  const paperProps: PaperProps = {
    sx: {
      bgcolor: isLightMode ? '#F6F5FA' : 'inherit',
      border: 'none',
    },
  }

  return (
    <>
      <TokenSummary {...token0} icon={tokenInfo0.icon} sx={{ pt: 0, px: 0 }} />
      <Paper component={FlexGrowCol} elevation={0} alignItems="stretch" overflow="hidden" mb={3}>
        <TokenBar text1={token0.value.toFixed(6)} text2={token1.symbol} text1Props={{ title: token0.value.toString() }} {...paperProps} />
      </Paper>
      <TokenSummary {...token1} icon={tokenInfo1.icon} sx={{ px: 0 }} />
      <Paper component={FlexGrowCol} elevation={0} alignItems="stretch" overflow="hidden">
        <TokenBar text1={formattedPrice(token1.value)} text1Props={{ title: token1.value.toString() }} text2={token0.symbol} {...paperProps} />
      </Paper>
    </>
  )
}

import { Divider } from '@mui/material'
import { FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { XyoUniswapCryptoPair } from '@xyo-network/cryptomarket-witness'

import { useGetTokenData } from '../../useGetTokenData'
import { GrayTokenBar } from './GreyTokenBar'
import { TokenSummary } from './TokenSummary'

interface StaticTokenSummaryProps {
  tokenPayload: XyoUniswapCryptoPair
}

export const StaticTokenComparison: React.FC<StaticTokenSummaryProps> = ({ tokenPayload }) => {
  const [tokenInfo0, tokenInfo1] = useGetTokenData([tokenPayload.tokens[0].symbol, tokenPayload.tokens[1].symbol])
  const [token0, token1] = tokenPayload.tokens

  return (
    <FlexGrowCol width="100%" justifyContent="flex-start" alignItems="flex-start" padding={0.5}>
      <TokenSummary {...token0} icon={tokenInfo0.icon}>
        <GrayTokenBar text1={token0.value} text2={token1.symbol} />
      </TokenSummary>
      <FlexGrowRow paddingY={2}>
        <Divider variant="fullWidth" />
      </FlexGrowRow>
      <TokenSummary {...token1} icon={tokenInfo1.icon}>
        <GrayTokenBar text1={token1.value} text2={token0.symbol} />
      </TokenSummary>
    </FlexGrowCol>
  )
}

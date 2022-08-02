import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded'
import { Divider, IconButton } from '@mui/material'
import { FlexGrowCol, FlexGrowRow } from '@xylabs/sdk-react'
import { XyoUniswapCryptoPair } from '@xyo-network/cryptomarket-witness'
import { useState } from 'react'

import { useGetTokenData } from '../../useGetTokenData'
import { GrayTokenBar } from './GreyTokenBar'
import { TokenSummary } from './TokenSummary'

interface TokenComparisonSummaryProps {
  tokenPayload: XyoUniswapCryptoPair
}

export const DynamicTokenComparison: React.FC<TokenComparisonSummaryProps> = ({ tokenPayload }) => {
  const [baseToken0, setBaseToken0] = useState(true)
  const [tokenInfo0, tokenInfo1] = useGetTokenData([tokenPayload.tokens[baseToken0 ? 0 : 1].symbol, tokenPayload.tokens[baseToken0 ? 1 : 0].symbol])
  const token0 = tokenPayload.tokens[baseToken0 ? 0 : 1]
  const token1 = tokenPayload.tokens[baseToken0 ? 1 : 0]

  return (
    <FlexGrowCol width="100%" justifyContent="flex-start" alignItems="flex-start" padding={0.5}>
      <TokenSummary {...token0} icon={tokenInfo0.icon}>
        <GrayTokenBar text1={baseToken0 ? 1 : token1.value} text2={token0.symbol} />
      </TokenSummary>
      <FlexGrowRow paddingY={2} width="100%">
        <Divider flexItem>
          <IconButton color="secondary" onClick={() => setBaseToken0(!baseToken0)}>
            <SwapHorizRoundedIcon />
          </IconButton>
        </Divider>
      </FlexGrowRow>
      <TokenSummary {...token1} icon={tokenInfo1.icon}>
        <GrayTokenBar text1={baseToken0 ? token0.value : 1} text2={token1.symbol} />
      </TokenSummary>
    </FlexGrowCol>
  )
}

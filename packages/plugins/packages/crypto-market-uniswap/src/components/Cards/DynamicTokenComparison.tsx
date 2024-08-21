import { SwapHorizRounded as SwapHorizRoundedIcon } from '@mui/icons-material'
import { Divider, IconButton } from '@mui/material'
import { toDecimalPrecision } from '@xylabs/decimal-precision'
import { FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import {
  TokenBar, TokenSummary, useGetTokenData,
} from '@xyo-network/react-shared'
import type { UniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import React, { useState } from 'react'

export interface TokenComparisonSummaryProps {
  tokenPayload: UniswapCryptoPair
}

export const DynamicTokenComparison: React.FC<TokenComparisonSummaryProps> = ({ tokenPayload }) => {
  const [baseToken0, setBaseToken0] = useState(true)
  const [tokenInfo0, tokenInfo1] = useGetTokenData([tokenPayload.tokens[baseToken0 ? 0 : 1].symbol, tokenPayload.tokens[baseToken0 ? 1 : 0].symbol])
  const token0 = tokenPayload.tokens[baseToken0 ? 0 : 1]
  const token1 = tokenPayload.tokens[baseToken0 ? 1 : 0]

  return (
    <FlexGrowCol width="100%" justifyContent="flex-start" alignItems="flex-start" padding={0.5}>
      <TokenSummary {...token0} icon={tokenInfo0.icon}>
        <TokenBar text1={baseToken0 ? 1 : toDecimalPrecision(token1.value, 6)} text2={token0.symbol} />
      </TokenSummary>
      <FlexGrowRow paddingY={2} width="100%">
        <Divider flexItem>
          <IconButton color="secondary" onClick={() => setBaseToken0(!baseToken0)}>
            <SwapHorizRoundedIcon />
          </IconButton>
        </Divider>
      </FlexGrowRow>
      <TokenSummary {...token1} icon={tokenInfo1.icon}>
        <TokenBar text1={baseToken0 ? toDecimalPrecision(token0.value, 6) : 1} text2={token1.symbol} />
      </TokenSummary>
    </FlexGrowCol>
  )
}

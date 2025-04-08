import type { PaperProps } from '@mui/material'
import {
  Link, Paper, useTheme,
} from '@mui/material'
import { toDecimalPrecision } from '@xylabs/decimal-precision'
import {
  getTokenData,
  TokenBar, TokenSummary,
} from '@xyo-network/react-shared'
import type { UniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import React from 'react'

interface StaticTokenSummaryProps {
  tokenPayload: UniswapCryptoPair
}

export const StaticTokenComparison: React.FC<StaticTokenSummaryProps> = ({ tokenPayload }) => {
  const theme = useTheme()
  const isLightMode = theme.palette.mode === 'light'
  const [tokenInfo0, tokenInfo1] = getTokenData([tokenPayload.tokens[0].symbol, tokenPayload.tokens[1].symbol])
  const [token0, token1] = tokenPayload.tokens

  const paperProps: PaperProps = {
    sx: {
      bgcolor: isLightMode ? '#F6F5FA' : 'inherit',
      border: 'none',
    },
  }

  return (
    <>
      <TokenSummary
        {...token0}
        icon={tokenInfo0.icon}
        symbolElement={(
          <Link href={tokenInfo0.coinmarketcapLink} underline="hover" target="_blank">
            {tokenInfo0.tokenSymbol}
          </Link>
        )}
        sx={{ pt: 0, px: 0 }}
      />
      <Paper
        elevation={0}
        sx={{
          alignItems: 'stretch', display: 'flex', flexDirection: 'column', flexGrow: 1, mb: 3, overflow: 'hidden',
        }}
      >
        <TokenBar text1={toDecimalPrecision(token0.value, 6)} text2={token1.symbol} text1Props={{ title: token0.value.toString() }} {...paperProps} />
      </Paper>
      <TokenSummary
        {...token1}
        icon={tokenInfo1.icon}
        symbolElement={(
          <Link href={tokenInfo1.coinmarketcapLink} underline="hover" target="_blank">
            {tokenInfo1.tokenSymbol}
          </Link>
        )}
        sx={{ px: 0 }}
      />
      <Paper
        elevation={0}
        sx={{
          alignItems: 'stretch', display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden',
        }}
      >
        <TokenBar text1={toDecimalPrecision(token1.value, 6)} text1Props={{ title: token1.value.toString() }} text2={token0.symbol} {...paperProps} />
      </Paper>
    </>
  )
}

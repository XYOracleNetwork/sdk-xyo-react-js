import { SwapHorizRounded as SwapHorizRoundedIcon } from '@mui/icons-material'
import { TableCell, TableRow } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { toDecimalPrecision } from '@xylabs/sdk-js'
import { getTokenData } from '@xyo-network/react-shared'
import type { UniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import React from 'react'

export interface TableRowProps {
  tokenPair: UniswapCryptoPair
}

export const UniswapTableRowRender: React.FC<TableRowProps> = ({ tokenPair }) => {
  const [token0, token1] = tokenPair.tokens

  const [tokenInfo0, tokenInfo1] = getTokenData([token0.symbol, token1.symbol])
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell align="center">
        <FlexRow columnGap={2}>
          <img src={tokenInfo0.icon} height="25px" />
          <SwapHorizRoundedIcon />
          <img src={tokenInfo1.icon} height="25px" />
        </FlexRow>
      </TableCell>
      <TableCell align="right">{tokenInfo0.readableName}</TableCell>
      <TableCell align="right">{toDecimalPrecision(token0.value, 6)}</TableCell>
      <TableCell align="right">{tokenInfo1.readableName}</TableCell>
      <TableCell align="right">{toDecimalPrecision(token1.value, 6)}</TableCell>
    </TableRow>
  )
}

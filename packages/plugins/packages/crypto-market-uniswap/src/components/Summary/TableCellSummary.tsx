import type { TableCellProps } from '@mui/material'
import { TableCell } from '@mui/material'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import type { TokenData } from '@xyo-network/react-shared'
import { getTokenData, ThemeTokenAvatarGroup } from '@xyo-network/react-shared'
import type { UniswapCryptoMarketPayload, UniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import React from 'react'

export const TableCellSummary: React.FC<PayloadRenderProps & TableCellProps> = ({ payload, ...props }) => {
  const payloadTyped = payload as UniswapCryptoMarketPayload
  const makeTokenList = (payloadData: UniswapCryptoPair[]) => {
    const tokenList: Set<string> = new Set()
    {
      for (const pair of payloadData) for (const token of pair.tokens) tokenList.add(token.symbol)
    }
    console.log(tokenList)
    return [...tokenList]
  }

  const makeTokenImageList = (tokenNameData: TokenData[]) => {
    const tokenImageList: Set<string> = new Set()
    {
      for (const token of tokenNameData) (tokenImageList.add(token.icon))
    }
    console.log(tokenImageList)
    return [...tokenImageList]
  }

  const payloadTokenList = makeTokenList(payloadTyped.pairs)
  const payloadTokenListData = getTokenData(payloadTokenList)
  const payloadTokenImageListData = makeTokenImageList(payloadTokenListData)
  console.log(payloadTokenListData)
  return (
    <TableCell {...props} align="left">
      <ThemeTokenAvatarGroup total={payloadTyped?.pairs.length} images={payloadTokenImageListData} />
    </TableCell>
  )
}

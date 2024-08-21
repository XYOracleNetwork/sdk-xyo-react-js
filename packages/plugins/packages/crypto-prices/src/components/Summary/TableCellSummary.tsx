import type { TableCellProps } from '@mui/material'
import { TableCell } from '@mui/material'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import type { TokenData } from '@xyo-network/react-shared'
import { ThemeTokenAvatarGroup, useGetTokenData } from '@xyo-network/react-shared'
import type { UniswapCryptoMarketPayload, UniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import React from 'react'

export const TableCellSummary: React.FC<PayloadRenderProps & TableCellProps> = ({
  payload, ...props
}) => {
  const payloadTyped = payload as UniswapCryptoMarketPayload
  const makeTokenList = (payloadData: UniswapCryptoPair[]) => {
    const tokenList: string[] = []
    {
      payloadData.map(pair => pair.tokens.map(token => (tokenList.includes(token.symbol) ? null : tokenList.push(token.symbol))))
    }
    return tokenList
  }

  const makeTokenImageList = (tokenNameData: TokenData[]) => {
    const tokenImageList: string[] = []
    {
      tokenNameData.map(token => (tokenImageList.includes(token.icon) ? null : tokenImageList.push(token.icon)))
    }
    console.log(tokenImageList)
    return tokenImageList
  }

  const payloadTokenList = makeTokenList(payloadTyped.pairs)
  const payloadTokenListData = useGetTokenData(payloadTokenList)
  const payloadTokenImageListData = makeTokenImageList(payloadTokenListData)
  console.log(payloadTokenListData)
  return (
    <TableCell {...props}>
      <ThemeTokenAvatarGroup total={payloadTyped?.pairs.length} images={payloadTokenImageListData} />
    </TableCell>
  )
}

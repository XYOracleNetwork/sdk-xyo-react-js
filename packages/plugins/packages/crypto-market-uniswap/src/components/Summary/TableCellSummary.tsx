import { TableCell, TableCellProps } from '@mui/material'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { TokenData, useGetTokenData, XyoThemeTokenAvatarGroup } from '@xyo-network/react-shared'
import { UniswapCryptoMarketPayload, UniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'

export const TableCellSummary: React.FC<PayloadRenderProps & TableCellProps> = ({ payload, ...props }) => {
  const payloadTyped = payload as UniswapCryptoMarketPayload
  const makeTokenList = (payloadData: UniswapCryptoPair[]) => {
    const tokenList: string[] = []
    {
      payloadData.map((pair) => pair.tokens.map((token) => (tokenList.includes(token.symbol) ? null : tokenList.push(token.symbol))))
    }
    console.log(tokenList)
    return tokenList
  }

  const makeTokenImageList = (tokenNameData: TokenData[]) => {
    const tokenImageList: string[] = []
    {
      tokenNameData.map((token) => (tokenImageList.includes(token.icon) ? null : tokenImageList.push(token.icon)))
    }
    console.log(tokenImageList)
    return tokenImageList
  }

  const payloadTokenList = makeTokenList(payloadTyped.pairs)
  const payloadTokenListData = useGetTokenData(payloadTokenList)
  const payloadTokenImageListData = makeTokenImageList(payloadTokenListData)
  console.log(payloadTokenListData)
  return (
    <TableCell {...props} align="left">
      <XyoThemeTokenAvatarGroup total={payloadTyped?.pairs.length} images={payloadTokenImageListData} />
    </TableCell>
  )
}

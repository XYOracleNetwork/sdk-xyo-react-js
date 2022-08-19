import { Avatar, AvatarGroup, TableCell, TableCellProps, useTheme } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { useGetTokenData } from '@xyo-network/react-shared'
import { XyoUniswapCryptoMarketPayload, XyoUniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'

export const TableCellSummary: React.FC<XyoPayloadRenderProps & TableCellProps> = ({ payload, ...props }) => {
  const payloadTyped = payload as XyoUniswapCryptoMarketPayload
  const makeTokenList = (payloadData: XyoUniswapCryptoPair[]) => {
    const tokenList: string[] = []
    {
      payloadData.map((pair) => pair.tokens.map((token) => (tokenList.includes(token.symbol) ? null : tokenList.push(token.symbol))))
    }
    return tokenList
  }
  const payloadTokenList = makeTokenList(payloadTyped.pairs)
  const payloadTokenListData = useGetTokenData(payloadTokenList)
  const theme = useTheme()
  return (
    <TableCell {...props}>
      <AvatarGroup total={payloadTyped?.pairs.length}>
        {payloadTokenListData.map((token) => (
          <Avatar
            sx={{ background: theme.palette.common.white, padding: theme.spacing(0.25) }}
            key={token.tokenSymbol}
            alt={token.tokenSymbol}
            src={token.icon}
          />
        ))}
      </AvatarGroup>
    </TableCell>
  )
}

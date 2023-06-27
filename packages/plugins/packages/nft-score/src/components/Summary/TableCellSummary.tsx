import { TableCell, TableCellProps } from '@mui/material'
import { isNftScorePayload, NftScorePayload } from '@xyo-network/crypto-wallet-nft-plugin'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { ThemeTokenAvatarGroup } from '@xyo-network/react-shared'

export const TableCellSummary: React.FC<PayloadRenderProps & TableCellProps> = ({ payload, ...props }) => {
  const nftScorePayload = payload && isNftScorePayload(payload) ? (payload as NftScorePayload) : undefined
  const categories = nftScorePayload ? Object.entries(nftScorePayload).filter(([key]) => key === 'schema') : undefined

  return (
    <TableCell {...props}>
      <ThemeTokenAvatarGroup total={categories?.length || 0} images={undefined} />
    </TableCell>
  )
}

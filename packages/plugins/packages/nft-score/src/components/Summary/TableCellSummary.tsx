import { TableCell, TableCellProps } from '@mui/material'
import { NftScore, NftScoreSchema } from '@xyo-network/crypto-nft-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { ThemeTokenAvatarGroup } from '@xyo-network/react-shared'
import React from 'react'

const isNftScorePayload = (payload?: Payload): payload is NftScore => {
  return payload?.schema === NftScoreSchema
}

export const TableCellSummary: React.FC<PayloadRenderProps & TableCellProps> = ({ payload, ...props }) => {
  const nftScorePayload = payload && isNftScorePayload(payload) ? (payload as NftScore) : undefined
  const categories = nftScorePayload ? Object.entries(nftScorePayload).filter(([key]) => key === 'schema') : undefined

  return (
    <TableCell {...props}>
      <ThemeTokenAvatarGroup total={categories?.length || 0} images={undefined} />
    </TableCell>
  )
}

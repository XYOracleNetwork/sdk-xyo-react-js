import type { TableCellProps } from '@mui/material'
import { TableCell } from '@mui/material'
import type { NftScore } from '@xyo-network/crypto-nft-payload-plugin'
import { NftScoreSchema } from '@xyo-network/crypto-nft-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { ThemeTokenAvatarGroup } from '@xyo-network/react-shared'
import React from 'react'

const isNftScorePayload = (payload?: Payload): payload is NftScore => {
  return payload?.schema === NftScoreSchema
}

export const TableCellSummary: React.FC<PayloadRenderProps & TableCellProps> = ({
  payload, ...props
}) => {
  const nftScorePayload = payload && isNftScorePayload(payload) ? (payload as NftScore) : undefined
  const categories = nftScorePayload ? Object.entries(nftScorePayload).filter(([key]) => key === 'schema') : undefined

  return (
    <TableCell {...props}>
      <ThemeTokenAvatarGroup total={categories?.length || 0} images={undefined} />
    </TableCell>
  )
}

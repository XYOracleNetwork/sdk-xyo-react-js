import type { TableCellProps } from '@mui/material'
import { TableCell } from '@mui/material'
import { EthAddressWrapper } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import React from 'react'

import type { ModuleRenderProps } from '../ModuleRenderProps.tsx'

export const ModuleTableCell: React.FC<ModuleRenderProps & TableCellProps> = ({
  children, mod, ...props
}) => {
  return (
    <TableCell {...props}>
      <EthAccountBox address={EthAddressWrapper.fromString(mod?.address)} />
      {children}
    </TableCell>
  )
}

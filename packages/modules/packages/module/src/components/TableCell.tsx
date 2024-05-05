import { TableCell, TableCellProps } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleTableCell: React.FC<ModuleRenderProps & TableCellProps> = ({ children, mod, ...props }) => {
  return (
    <TableCell {...props}>
      <EthAccountBox address={EthAddress.fromString(mod?.address)} />
      {children}
    </TableCell>
  )
}

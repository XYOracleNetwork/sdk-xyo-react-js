import { TableCell, TableCellProps } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleTableCell: React.FC<ModuleRenderProps & TableCellProps> = ({ children, module, ...props }) => {
  return (
    <TableCell {...props}>
      <EthAccountBox address={EthAddress.fromString(module?.address)} />
      {children}
    </TableCell>
  )
}

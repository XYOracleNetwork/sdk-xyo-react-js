import { TableCell, TableCellProps } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { ModuleWrapper } from '@xyo-network/module'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleTableCell: React.FC<ModuleRenderProps & TableCellProps> = ({ children, module, ...props }) => {
  const wrapper = module ? ModuleWrapper.wrap(module) : undefined
  return (
    <TableCell {...props}>
      <EthAccountBox address={EthAddress.fromString(wrapper?.address)} />
      {children}
    </TableCell>
  )
}

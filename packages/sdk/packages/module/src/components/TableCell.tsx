import { TableCell, TableCellProps } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { ModuleWrapper } from '@xyo-network/module'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleTableCell: React.FC<ModuleRenderProps & TableCellProps> = ({ module, ...props }) => {
  const wrapper = module ? new ModuleWrapper(module) : undefined
  return (
    <TableCell {...props}>
      <EthAccountBox address={EthAddress.fromString(wrapper?.address)} />
    </TableCell>
  )
}

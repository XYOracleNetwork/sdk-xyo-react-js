import { TableCell, TableCellProps } from '@mui/material'
import { EthAddress } from '@xylabs/sdk-js'
import { EthAccountBox } from '@xylabs/sdk-react'
import { XyoModuleWrapper } from '@xyo-network/module'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleTableCell: React.FC<ModuleRenderProps & TableCellProps> = ({ module, ...props }) => {
  const wrapper = module ? new XyoModuleWrapper(module) : undefined
  return (
    <TableCell {...props}>
      <EthAccountBox address={EthAddress.fromString(wrapper?.address)} />
    </TableCell>
  )
}

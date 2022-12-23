import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { ModuleWrapper } from '@xyo-network/module'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleDetailsBox: React.FC<ModuleRenderProps & FlexBoxProps> = ({ module, ...props }) => {
  const wrapper = module ? new ModuleWrapper(module) : undefined
  return (
    <FlexCol {...props}>
      <EthAccountBox address={EthAddress.fromString(wrapper?.address)} />
    </FlexCol>
  )
}

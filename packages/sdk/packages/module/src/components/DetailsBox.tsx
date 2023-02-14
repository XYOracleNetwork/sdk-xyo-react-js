import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { ModuleWrapper } from '@xyo-network/module'
import { findNetworkComponent } from '@xyo-network/react-shared'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleDetailsBox: React.FC<ModuleRenderProps & FlexBoxProps> = ({ module, ...props }) => {
  const wrapper = module ? new ModuleWrapper(module) : undefined
  return (
    <FlexCol {...props}>
      <EthAccountBox address={EthAddress.fromString(wrapper?.address)} />
      {wrapper?.queries().map((query) => {
        return <FlexRow key={query}>{query}</FlexRow>
      })}
      <FlexRow>
        {wrapper?.queries().find((query) => query.startsWith('network.xyo.query.archivist')) ? findNetworkComponent('archivist')?.icon() : null}
        {wrapper?.queries().find((query) => query.startsWith('network.xyo.query.diviner')) ? findNetworkComponent('diviner')?.icon() : null}
        {wrapper?.queries().find((query) => query.startsWith('network.xyo.query.witness')) ? findNetworkComponent('sentinel')?.icon() : null}
        {wrapper?.queries().find((query) => query.startsWith('network.xyo.query.node')) ? findNetworkComponent('node')?.icon() : null}
      </FlexRow>
    </FlexCol>
  )
}

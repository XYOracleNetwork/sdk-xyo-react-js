import { EthAddress } from '@xylabs/eth-address'
import { ButtonEx } from '@xylabs/react-button'
import { EthAccountBox } from '@xylabs/react-crypto'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { ModuleWrapper } from '@xyo-network/module'
import { findNetworkComponent } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ModuleRenderProps } from '../ModuleRenderProps'

const getModuleIcon = (moduleType: string, wrapper: ModuleWrapper) => {
  return wrapper?.queries().find((query) => query.startsWith(`network.xyo.query.${moduleType}`)) ? findNetworkComponent(moduleType)?.icon() : null
}

export const ModuleDetailsBox: React.FC<ModuleRenderProps & FlexBoxProps> = ({ children, module, ...props }) => {
  const wrapper = module ? new ModuleWrapper(module) : undefined
  const [showQueries, setShowQueries] = useState(false)
  return (
    <FlexCol {...props}>
      <FlexRow>
        {wrapper
          ? ['sentinel', 'bridge', 'archivist', 'diviner', 'node'].map((moduleType) => {
              const icon = getModuleIcon(moduleType, wrapper)
              return icon ? (
                <ButtonEx onClick={() => setShowQueries(!showQueries)} key={moduleType}>
                  {icon}
                </ButtonEx>
              ) : null
            })
          : null}
        <EthAccountBox address={EthAddress.fromString(wrapper?.address)} />
      </FlexRow>

      {showQueries
        ? wrapper?.queries().map((query) => {
            return <FlexRow key={query}>{query}</FlexRow>
          })
        : null}
      {children}
    </FlexCol>
  )
}

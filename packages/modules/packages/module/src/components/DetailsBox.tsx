import { EthAddress } from '@xylabs/eth-address'
import { ButtonEx } from '@xylabs/react-button'
import { EthAccountBox } from '@xylabs/react-crypto'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { Module } from '@xyo-network/module-model'
import { findNetworkComponent } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ModuleRenderProps } from '../ModuleRenderProps.js'

const getModuleIcon = (moduleType: string, mod: Module) => {
  return mod?.queries.find(query => query.startsWith(`network.xyo.query.${moduleType}`)) ? findNetworkComponent(moduleType)?.icon() : null
}

export const ModuleDetailsBox: React.FC<ModuleRenderProps & FlexBoxProps> = ({ children, mod, ...props }) => {
  const [showQueries, setShowQueries] = useState(false)
  return (
    <FlexCol {...props}>
      <FlexRow>
        {mod
          ? ['sentinel', 'bridge', 'archivist', 'diviner', 'node'].map((moduleType) => {
              const icon = getModuleIcon(moduleType, mod)
              return icon
                ? (
                    <ButtonEx onClick={() => setShowQueries(!showQueries)} key={moduleType}>
                      {icon}
                    </ButtonEx>
                  )
                : null
            })
          : null}
        <EthAccountBox address={EthAddress.fromString(mod?.address)} />
      </FlexRow>

      {showQueries
        ? mod?.queries.map((query) => {
          return <FlexRow key={query}>{query}</FlexRow>
        })
        : null}
      {children}
    </FlexCol>
  )
}

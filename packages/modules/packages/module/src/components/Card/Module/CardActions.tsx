import { CardActions, CardActionsProps } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { ModuleWrapper } from '@xyo-network/module'
import { findNetworkComponent } from '@xyo-network/react-shared'

import { ModuleRenderProps } from '../../../ModuleRenderProps'

const getModuleIcons = (moduleType: string, wrapper: ModuleWrapper) => {
  return wrapper?.queries.find((query) => query.startsWith(`network.xyo.query.${moduleType}`)) ? findNetworkComponent(moduleType)?.icon() : null
}

export const ModuleCardActions: React.FC<CardActionsProps & ModuleRenderProps> = ({ children, module, ...props }) => {
  const wrapper = module ? ModuleWrapper.wrap(module) : undefined
  return (
    <CardActions style={{ justifyContent: 'space-between' }} {...props}>
      {wrapper
        ? ['sentinel', 'bridge', 'archivist', 'diviner', 'node'].map((moduleType) => {
            const icon = getModuleIcons(moduleType, wrapper)
            return icon ? <ButtonEx key={moduleType}>{icon}</ButtonEx> : null
          })
        : null}
      <ButtonEx onClick={() => wrapper?.discover()}>Discover</ButtonEx>
      {children}
    </CardActions>
  )
}

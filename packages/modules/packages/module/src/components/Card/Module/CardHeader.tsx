import { CardHeader, CardHeaderProps } from '@mui/material'
import { ModuleWrapper } from '@xyo-network/module'
import { findNetworkComponent } from '@xyo-network/react-shared'

import { ModuleRenderProps } from '../../../ModuleRenderProps'

const getModuleIcons = (moduleType: string, wrapper: ModuleWrapper) => {
  return wrapper?.queries.find((query) => query.startsWith(`network.xyo.query.${moduleType}`)) ? findNetworkComponent(moduleType)?.icon : null
}

export const ModuleCardHeader: React.FC<ModuleRenderProps & CardHeaderProps> = ({ subheader, avatar, title, module, ...props }) => {
  const wrapper = module ? ModuleWrapper.wrap(module) : undefined

  return (
    <CardHeader
      title={title ?? module?.config.name ?? 'Module'}
      subheader={subheader ?? wrapper?.address}
      avatar={
        avatar ?? (
          <>
            {wrapper
              ? ['sentinel', 'bridge', 'archivist', 'diviner', 'node', 'witness'].map((moduleType) => {
                  const Icon = getModuleIcons(moduleType, wrapper)
                  return Icon ? <Icon fontSize={'large'} color="primary" /> : null
                })
              : null}
          </>
        )
      }
      {...props}
    />
  )
}

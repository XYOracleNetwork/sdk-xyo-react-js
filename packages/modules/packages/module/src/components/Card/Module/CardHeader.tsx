import { CardHeader, CardHeaderProps } from '@mui/material'
import { Module } from '@xyo-network/module'
import { findNetworkComponent } from '@xyo-network/react-shared'

import { ModuleRenderProps } from '../../../ModuleRenderProps'

const getModuleIcons = (moduleType: string, module: Module) => {
  return module?.queries.find((query) => query.startsWith(`network.xyo.query.${moduleType}`)) ? findNetworkComponent(moduleType)?.icon : null
}

export const ModuleCardHeader: React.FC<ModuleRenderProps & CardHeaderProps> = ({ subheader, avatar, title, module, ...props }) => {
  return (
    <CardHeader
      title={title ?? module?.config.name ?? 'Module'}
      subheader={subheader ?? module?.address}
      avatar={
        avatar ?? (
          <>
            {module
              ? ['sentinel', 'bridge', 'archivist', 'diviner', 'node', 'witness'].map((moduleType) => {
                  const Icon = getModuleIcons(moduleType, module)
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

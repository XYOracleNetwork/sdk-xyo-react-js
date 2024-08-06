import { CardHeader, CardHeaderProps } from '@mui/material'
import { Module } from '@xyo-network/module-model'
import { findNetworkComponent } from '@xyo-network/react-shared'
import React from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'

const moduleTypes = ['sentinel', 'bridge', 'archivist', 'diviner', 'node', 'witness']

const getModuleIcons = (moduleType: string, mod: Module) => {
  return mod?.queries.find(query => query.startsWith(`network.xyo.query.${moduleType}`)) ? findNetworkComponent(moduleType)?.icon : null
}

export const ModuleCardHeader: React.FC<ModuleRenderProps & CardHeaderProps> = ({ subheader, avatar, title, mod, ...props }) => {
  return (
    <CardHeader
      title={title ?? mod?.config.name ?? 'Module'}
      subheader={subheader ?? mod?.address}
      avatar={
        avatar ?? (
          <>
            {mod
              ? moduleTypes.map((moduleType) => {
                const Icon = getModuleIcons(moduleType, mod)
                return Icon ? <Icon key={moduleType} fontSize="large" color="primary" /> : null
              })
              : null}
          </>
        )
      }
      {...props}
    />
  )
}

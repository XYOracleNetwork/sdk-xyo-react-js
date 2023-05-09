import { CardActions, CardActionsProps, Chip } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { ModuleWrapper } from '@xyo-network/module'
import { findNetworkComponent } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { DiscoverDialog } from './components'

const getModuleIcons = (moduleType: string, wrapper: ModuleWrapper) => {
  return wrapper?.queries.find((query) => query.startsWith(`network.xyo.query.${moduleType}`)) ? findNetworkComponent(moduleType)?.icon : null
}

export const ModuleCardActions: React.FC<CardActionsProps & ModuleRenderProps> = ({ children, module, sx, ...props }) => {
  const [discoverDialogOpen, setDiscoverDialogOpen] = useState(false)
  const wrapper = module ? ModuleWrapper.wrap(module) : undefined
  const config = wrapper?.config

  return (
    <CardActions sx={{ alignItems: 'stretch', flexDirection: 'column', ml: 1, ...sx }} {...props}>
      <FlexGrowRow justifyContent="space-between" alignItems="center">
        {wrapper
          ? ['sentinel', 'bridge', 'archivist', 'diviner', 'node', 'witness'].map((moduleType) => {
              const Icon = getModuleIcons(moduleType, wrapper)
              return Icon ? (
                <Chip
                  avatar={<Icon sx={{ p: 0.25 }} />}
                  key={moduleType}
                  label={config?.schema}
                  size={'small'}
                  sx={{ bgcolor: 'transparent' }}
                  title={moduleType.toLocaleUpperCase()}
                />
              ) : null
            })
          : null}
        <ButtonEx onClick={() => setDiscoverDialogOpen(true)} size={'small'} variant={'outlined'}>
          Discover
        </ButtonEx>
        <DiscoverDialog fullWidth maxWidth={'md'} module={module} open={discoverDialogOpen} setOpen={setDiscoverDialogOpen} wrapper={wrapper} />
      </FlexGrowRow>
      {children}
    </CardActions>
  )
}

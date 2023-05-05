import { CardActions, CardActionsProps, Divider, Icon, Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { ModuleWrapper } from '@xyo-network/module'
import { findNetworkComponent } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { DiscoverDialog } from './components'

const getModuleIcons = (moduleType: string, wrapper: ModuleWrapper) => {
  return wrapper?.queries.find((query) => query.startsWith(`network.xyo.query.${moduleType}`)) ? findNetworkComponent(moduleType)?.icon() : null
}

export const ModuleCardActions: React.FC<CardActionsProps & ModuleRenderProps> = ({ children, module, sx, ...props }) => {
  const [discoverDialogOpen, setDiscoverDialogOpen] = useState(false)
  const wrapper = module ? ModuleWrapper.wrap(module) : undefined
  const config = wrapper?.config

  return (
    <CardActions sx={{ alignItems: 'stretch', flexDirection: 'column', ml: 1, ...sx }} {...props}>
      <Typography variant="caption" fontFamily="inherit" fontWeight="500">
        {config?.schema}
      </Typography>
      <Divider flexItem sx={{ my: 1 }} />
      <FlexGrowRow justifyContent="space-between" alignItems="center">
        {wrapper
          ? ['sentinel', 'bridge', 'archivist', 'diviner', 'node', 'witness'].map((moduleType) => {
              const icon = getModuleIcons(moduleType, wrapper)
              return icon ? (
                <Icon color={'primary'} key={moduleType} title={moduleType.toLocaleUpperCase()}>
                  {icon}
                </Icon>
              ) : null
            })
          : null}
        <ButtonEx onClick={() => setDiscoverDialogOpen(true)} size={'small'} variant={'outlined'}>
          Discover
        </ButtonEx>
        <DiscoverDialog fullWidth maxWidth={'md'} open={discoverDialogOpen} setOpen={setDiscoverDialogOpen} wrapper={wrapper} />
      </FlexGrowRow>
      {children}
    </CardActions>
  )
}

import { CardActions, CardActionsProps, Divider, Icon, Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ButtonEx } from '@xylabs/react-button'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { AnyConfigSchema, ModuleConfig, ModuleWrapper } from '@xyo-network/module'
import { findNetworkComponent } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps'

const getModuleIcons = (moduleType: string, wrapper: ModuleWrapper) => {
  return wrapper?.queries.find((query) => query.startsWith(`network.xyo.query.${moduleType}`)) ? findNetworkComponent(moduleType)?.icon() : null
}

export const ModuleCardActions: React.FC<CardActionsProps & ModuleRenderProps> = ({ children, module, sx, ...props }) => {
  const [config, setConfig] = useState<AnyConfigSchema<ModuleConfig>>()
  const wrapper = module ? ModuleWrapper.wrap(module) : undefined

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const wrapper = module ? ModuleWrapper.wrap(module) : undefined
      const payloads = await wrapper?.discover()
      console.log(`Payloads: ${JSON.stringify(payloads, null, 2)}`)
      if (mounted()) {
        setConfig(payloads?.[0])
      }
    },
    [module],
  )

  return (
    <CardActions sx={{ alignItems: 'stretch', flexDirection: 'column', ml: 1, ...sx }} {...props}>
      <Typography variant="caption" fontFamily="inherit" fontWeight="500" sx={{ mb: 1 }}>
        {config?.schema}
      </Typography>
      <Divider flexItem />
      <FlexGrowRow justifyContent="space-between" alignItems="center">
        {wrapper
          ? ['sentinel', 'bridge', 'archivist', 'diviner', 'node'].map((moduleType) => {
              const icon = getModuleIcons(moduleType, wrapper)
              return icon ? (
                <Icon color={'primary'} key={moduleType}>
                  {icon}
                </Icon>
              ) : null
            })
          : null}
        <ButtonEx onClick={() => wrapper?.discover()}>Discover</ButtonEx>
      </FlexGrowRow>
      {children}
    </CardActions>
  )
}

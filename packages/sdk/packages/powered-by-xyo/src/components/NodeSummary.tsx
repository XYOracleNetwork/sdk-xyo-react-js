import { HubRounded as HubRoundedIcon } from '@mui/icons-material'
import { usePromise } from '@xylabs/react-promise'
import type { NodeManifest } from '@xyo-network/manifest'
import type { NodeInstance } from '@xyo-network/node-model'
import { useWeakModulesFromNode } from '@xyo-network/react-node'
import React from 'react'

import type { ModuleSummaryProps } from './ModuleSummary.tsx'
import { ModuleSummary } from './ModuleSummary.tsx'

export const NodeSummary: React.FC<ModuleSummaryProps<NodeInstance>> = ({ mod, ...props }) => {
  const [manifest] = usePromise(async () => {
    return (await mod?.manifest()) as NodeManifest
  }, [mod])

  const [downModules] = useWeakModulesFromNode(undefined, { direction: 'down' })
  const [upModules] = useWeakModulesFromNode(undefined, { direction: 'up' })

  const downModulesFromResolve = downModules?.length
  const upModulesFromResolve = upModules?.length

  const manifestPublicModules = manifest?.modules?.public?.length

  return (
    <ModuleSummary mod={mod} icon={<HubRoundedIcon />} {...props}>
      {manifestPublicModules !== undefined && downModulesFromResolve !== undefined && upModulesFromResolve !== undefined
        ? `[${manifestPublicModules}m/${downModulesFromResolve}↓/${upModulesFromResolve}↑]`
        : null}
    </ModuleSummary>
  )
}

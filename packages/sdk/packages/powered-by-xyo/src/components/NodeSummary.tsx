import { HubRounded as HubRoundedIcon } from '@mui/icons-material'
import { usePromise } from '@xylabs/react-promise'
import { NodeManifest } from '@xyo-network/manifest'
import { NodeInstance } from '@xyo-network/node-model'
import { useWeakModulesFromNode } from '@xyo-network/react-node'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary.js'

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
      {manifestPublicModules !== undefined && downModulesFromResolve !== undefined && upModulesFromResolve !== undefined ?
        `[${manifestPublicModules}m/${downModulesFromResolve}↓/${upModulesFromResolve}↑]`
      : null}
    </ModuleSummary>
  )
}

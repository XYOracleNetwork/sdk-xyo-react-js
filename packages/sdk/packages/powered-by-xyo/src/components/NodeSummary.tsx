import { HubRounded as HubRoundedIcon } from '@mui/icons-material'
import { usePromise } from '@xylabs/react-promise'
import { NodeInstance } from '@xyo-network/node-model'
import { useModulesFromNode } from '@xyo-network/react-node'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'

export const NodeSummary: React.FC<ModuleSummaryProps<NodeInstance>> = ({ module, ...props }) => {
  const [manifest] = usePromise(async () => {
    return await module?.manifest()
  }, [module])

  const [downModules] = useModulesFromNode(undefined, { direction: 'down' })
  const [upModules] = useModulesFromNode(undefined, { direction: 'up' })

  const downModulesFromResolve = downModules?.length
  const upModulesFromResolve = upModules?.length

  const manifestPublicModules = manifest?.modules?.public?.length

  return (
    <ModuleSummary module={module} icon={<HubRoundedIcon />} {...props}>
      {manifestPublicModules !== undefined && downModulesFromResolve !== undefined && upModulesFromResolve !== undefined
        ? `[${manifestPublicModules}m/${downModulesFromResolve}↓/${upModulesFromResolve}↑]`
        : null}
    </ModuleSummary>
  )
}

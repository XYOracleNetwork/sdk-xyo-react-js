import { isArchivistInstance } from '@xyo-network/archivist-model'
import { isBridgeInstance } from '@xyo-network/bridge-model'
import { isDivinerInstance } from '@xyo-network/diviner-model'
import { ModuleInstance } from '@xyo-network/module-model'
import { isNodeInstance } from '@xyo-network/node-model'
import { isSentinelInstance } from '@xyo-network/sentinel'
import { isWitnessModule } from '@xyo-network/witness-model'

import { CyNodeModuleTypes } from './CyNodeModuleTypes'

export const parseModuleType = (module?: ModuleInstance): CyNodeModuleTypes => {
  let type: CyNodeModuleTypes = 'module'
  if (module) {
    if (isArchivistInstance(module)) {
      type = 'archivist'
    } else if (isBridgeInstance(module)) {
      type = 'bridge'
    } else if (isDivinerInstance(module)) {
      type = 'diviner'
    } else if (isNodeInstance(module)) {
      type = 'node'
    } else if (isSentinelInstance(module)) {
      type = 'sentinel'
    } else if (isWitnessModule(module)) {
      type = 'witness'
    } else {
      type = 'module'
    }
  }
  return type
}

import { isArchivistInstance } from '@xyo-network/archivist-model'
import { isBridgeInstance } from '@xyo-network/bridge-model'
import { isDivinerInstance } from '@xyo-network/diviner-model'
import { ModuleInstance } from '@xyo-network/module-model'
import { isNodeInstance } from '@xyo-network/node-model'
import { isSentinelInstance } from '@xyo-network/sentinel-model'
import { isWitnessModule } from '@xyo-network/witness-model'

import { CyNodeModuleTypes } from './CyNodeModuleTypes'

export const parseModuleType = (mod?: ModuleInstance): CyNodeModuleTypes => {
  let type: CyNodeModuleTypes = 'module'
  if (mod) {
    if (isArchivistInstance(mod)) {
      type = 'archivist'
    } else if (isBridgeInstance(mod)) {
      type = 'bridge'
    } else if (isDivinerInstance(mod)) {
      type = 'diviner'
    } else if (isNodeInstance(mod)) {
      type = 'node'
    } else if (isSentinelInstance(mod)) {
      type = 'sentinel'
    } else if (isWitnessModule(mod)) {
      type = 'witness'
    } else {
      type = 'module'
    }
  }
  return type
}

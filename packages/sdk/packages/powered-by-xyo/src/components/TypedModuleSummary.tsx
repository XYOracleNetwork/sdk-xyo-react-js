import { isArchivistInstance } from '@xyo-network/archivist-model'
import { isBridgeInstance } from '@xyo-network/bridge-model'
import { isDivinerInstance } from '@xyo-network/diviner-model'
import { isNodeInstance } from '@xyo-network/node-model'
import { isSentinelInstance } from '@xyo-network/sentinel-model'
import { isWitnessInstance } from '@xyo-network/witness-model'
import React from 'react'

import { ArchivistSummary } from './ArchivistSummary.js'
import { BridgeSummary } from './BridgeSummary.js'
import { DivinerSummary } from './DivinerSummary.js'
import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary.js'
import { NodeSummary } from './NodeSummary.js'
import { SentinelSummary } from './SentinelSummary.js'
import { WitnessSummary } from './WitnessSummary.js'

export const TypedModuleSummary: React.FC<ModuleSummaryProps> = ({ mod, ...props }) => {
  if (isArchivistInstance(mod)) {
    return <ArchivistSummary mod={mod} {...props} />
  }
  if (isDivinerInstance(mod)) {
    return <DivinerSummary mod={mod} {...props} />
  }
  if (isNodeInstance(mod)) {
    return <NodeSummary mod={mod} {...props} />
  }
  if (isWitnessInstance(mod)) {
    return <WitnessSummary mod={mod} {...props} />
  }
  if (isBridgeInstance(mod)) {
    return <BridgeSummary mod={mod} {...props} />
  }
  if (isSentinelInstance(mod)) {
    return <SentinelSummary mod={mod} {...props} />
  }
  return <ModuleSummary mod={mod} {...props} />
}

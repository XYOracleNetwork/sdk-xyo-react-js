import { isArchivistInstance } from '@xyo-network/archivist-model'
import { isBridgeInstance } from '@xyo-network/bridge-model'
import { isDivinerInstance } from '@xyo-network/diviner-model'
import { isNodeInstance } from '@xyo-network/node-model'
import { isSentinelInstance } from '@xyo-network/sentinel-model'
import { isWitnessInstance } from '@xyo-network/witness-model'

import { ArchivistSummary } from './ArchivistSummary'
import { BridgeSummary } from './BridgeSummary'
import { DivinerSummary } from './DivinerSummary'
import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'
import { NodeSummary } from './NodeSummary'
import { SentinelSummary } from './SentinelSummary'
import { WitnessSummary } from './WitnessSummary'

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

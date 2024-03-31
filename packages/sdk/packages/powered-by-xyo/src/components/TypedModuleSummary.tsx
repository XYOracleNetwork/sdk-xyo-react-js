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

export const TypedModuleSummary: React.FC<ModuleSummaryProps> = ({ module, ...props }) => {
  if (isArchivistInstance(module)) {
    return <ArchivistSummary module={module} {...props} />
  }
  if (isDivinerInstance(module)) {
    return <DivinerSummary module={module} {...props} />
  }
  if (isNodeInstance(module)) {
    return <NodeSummary module={module} {...props} />
  }
  if (isWitnessInstance(module)) {
    return <WitnessSummary module={module} {...props} />
  }
  if (isBridgeInstance(module)) {
    return <BridgeSummary module={module} {...props} />
  }
  if (isSentinelInstance(module)) {
    return <SentinelSummary module={module} {...props} />
  }
  return <ModuleSummary module={module} {...props} />
}

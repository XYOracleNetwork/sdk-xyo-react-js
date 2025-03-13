import { MemoryArchivist } from '@xyo-network/archivist-memory'
import { MemoryBoundWitnessDiviner } from '@xyo-network/diviner-boundwitness-memory'
import { MemoryPayloadDiviner } from '@xyo-network/diviner-payload-memory'
import {
  TemporalIndexingDiviner,
  TemporalIndexingDivinerDivinerQueryToIndexQueryDiviner,
  TemporalIndexingDivinerIndexCandidateToIndexDiviner,
  TemporalIndexingDivinerIndexQueryResponseToDivinerQueryResponseDiviner,
  TemporalIndexingDivinerStateToIndexCandidateDiviner,
} from '@xyo-network/diviner-temporal-indexing-memory'
import { EvmContractWitness } from '@xyo-network/evm-contract-witness'
import { EvmTokenInterfaceImplementedDiviner } from '@xyo-network/evm-token-interface-diviner'
import type { PackageManifestPayload } from '@xyo-network/manifest'
import type { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'
import { ModuleFactory } from '@xyo-network/module-model'
import type { CreatablePackageManifest } from '@xyo-network/react-manifest'
import { TimestampWitness } from '@xyo-network/witness-timestamp'
import { InfuraProvider } from 'ethers'

import contractWitnessManifest from './contract-witness-index-node.json' with { type: 'json' }

export const ContractWitnessManifestNode: CreatablePackageManifest = (locator: ModuleFactoryLocator): PackageManifestPayload => {
  locator.register(MemoryArchivist)
  locator.register(MemoryBoundWitnessDiviner)
  locator.register(MemoryPayloadDiviner)
  locator.register(TimestampWitness)
  locator.register(TemporalIndexingDivinerDivinerQueryToIndexQueryDiviner)
  locator.register(TemporalIndexingDivinerIndexCandidateToIndexDiviner)
  locator.register(TemporalIndexingDivinerIndexQueryResponseToDivinerQueryResponseDiviner)
  locator.register(TemporalIndexingDivinerStateToIndexCandidateDiviner)
  locator.register(TemporalIndexingDiviner)
  locator.register(EvmTokenInterfaceImplementedDiviner)
  locator.register(
    new ModuleFactory(EvmContractWitness, { providers: () => [new InfuraProvider('homestead', process.env.STORYBOOK_INFURA_PROJECT_ID)] }),
  )

  return contractWitnessManifest as PackageManifestPayload
}

import { MemoryArchivist } from '@xyo-network/archivist-memory'
import { MemoryBoundWitnessDiviner } from '@xyo-network/diviner-boundwitness-memory'
import { GenericPayloadDiviner } from '@xyo-network/diviner-payload-generic'
import {
  TemporalIndexingDiviner,
  TemporalIndexingDivinerDivinerQueryToIndexQueryDiviner,
  TemporalIndexingDivinerIndexCandidateToIndexDiviner,
  TemporalIndexingDivinerIndexQueryResponseToDivinerQueryResponseDiviner,
  TemporalIndexingDivinerStateToIndexCandidateDiviner,
} from '@xyo-network/diviner-temporal-indexing-memory'
import type { EvmContractWitnessParams } from '@xyo-network/evm-contract-witness'
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
  locator.register(MemoryArchivist.factory())
  locator.register(MemoryBoundWitnessDiviner.factory())
  locator.register(GenericPayloadDiviner.factory())
  locator.register(TimestampWitness.factory())
  locator.register(TemporalIndexingDivinerDivinerQueryToIndexQueryDiviner.factory())
  locator.register(TemporalIndexingDivinerIndexCandidateToIndexDiviner.factory())
  locator.register(TemporalIndexingDivinerIndexQueryResponseToDivinerQueryResponseDiviner.factory())
  locator.register(TemporalIndexingDivinerStateToIndexCandidateDiviner.factory())
  locator.register(TemporalIndexingDiviner.factory())
  locator.register(EvmTokenInterfaceImplementedDiviner.factory())
  locator.register(
    new ModuleFactory(
      EvmContractWitness,
      { providers: () => [new InfuraProvider('homestead', process.env.STORYBOOK_INFURA_PROJECT_ID)] } as Partial<EvmContractWitnessParams>,
    ),
  )

  return contractWitnessManifest as PackageManifestPayload
}

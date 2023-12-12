import { asArchivistInstance, isArchivistInstance } from '@xyo-network/archivist-model'
import { asDivinerInstance, isDivinerInstance } from '@xyo-network/diviner-model'
import { ModuleInstance } from '@xyo-network/module-model'
import { ArchivistCard } from '@xyo-network/react-archivist'
import { DivinerCard, ModuleCard } from '@xyo-network/react-module'

export interface ModuleCardParserProps {
  module?: ModuleInstance
}

export const ModuleCardParser: React.FC<ModuleCardParserProps> = ({ module }) => {
  switch (true) {
    case isArchivistInstance(module):
      return <ArchivistCard module={asArchivistInstance(module)} />
    case isDivinerInstance(module):
      return <DivinerCard module={asDivinerInstance(module)} />
    default:
      return <ModuleCard module={module} />
  }
}

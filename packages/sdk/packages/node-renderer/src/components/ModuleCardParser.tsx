import { asArchivistInstance } from '@xyo-network/archivist-model'
import { asDivinerInstance } from '@xyo-network/diviner-model'
import { ModuleInstance } from '@xyo-network/module'
import { ArchivistCard } from '@xyo-network/react-archivist'
import { DivinerCard, ModuleCard } from '@xyo-network/react-module'

export interface ModuleCardParserProps {
  module?: ModuleInstance
}

export const ModuleCardParser: React.FC<ModuleCardParserProps> = ({ module }) => {
  switch (true) {
    case module?.config.schema.includes('archivist'):
      return <ArchivistCard module={asArchivistInstance(module)} />
    case module?.config.schema.includes('diviner'):
      return <DivinerCard module={asDivinerInstance(module)} />
    default:
      return <ModuleCard module={module} />
  }
}

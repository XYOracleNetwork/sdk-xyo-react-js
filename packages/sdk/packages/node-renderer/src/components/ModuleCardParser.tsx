import { ArchivistModule } from '@xyo-network/archivist-model'
import { DivinerModule } from '@xyo-network/diviner-model'
import { Module } from '@xyo-network/module'
import { ArchivistCard } from '@xyo-network/react-archivist'
import { DivinerCard, ModuleCard } from '@xyo-network/react-module'

export interface ModuleCardParserProps {
  module?: Module
}

export const ModuleCardParser: React.FC<ModuleCardParserProps> = ({ module }) => {
  switch (true) {
    case module?.config.schema.includes('archivist'):
      return <ArchivistCard module={module as ArchivistModule} />
    case module?.config.schema.includes('diviner'):
      return <DivinerCard module={module as DivinerModule} />
    default:
      return <ModuleCard module={module} />
  }
}

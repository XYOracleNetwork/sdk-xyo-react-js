import { asArchivistInstance, isArchivistInstance } from '@xyo-network/archivist-model'
import { asDivinerInstance, isDivinerInstance } from '@xyo-network/diviner-model'
import { ModuleInstance } from '@xyo-network/module-model'
import { ArchivistCard } from '@xyo-network/react-archivist'
import { DivinerCard, ModuleCard } from '@xyo-network/react-module'

export interface ModuleCardParserProps {
  mod?: ModuleInstance
}

export const ModuleCardParser: React.FC<ModuleCardParserProps> = ({ mod }) => {
  switch (true) {
    case isArchivistInstance(mod): {
      return <ArchivistCard mod={asArchivistInstance(mod)} />
    }
    case isDivinerInstance(mod): {
      return <DivinerCard mod={asDivinerInstance(mod)} />
    }
    default: {
      return <ModuleCard mod={mod} />
    }
  }
}

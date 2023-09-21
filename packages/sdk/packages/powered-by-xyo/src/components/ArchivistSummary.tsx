import { Inventory2Rounded as Inventory2RoundedIcon } from '@mui/icons-material'
import { ArchivistInstance } from '@xyo-network/archivist-model'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'

export const ArchivistSummary: React.FC<ModuleSummaryProps<ArchivistInstance>> = ({ module, ...props }) => {
  return <ModuleSummary module={module} icon={<Inventory2RoundedIcon />} {...props} />
}

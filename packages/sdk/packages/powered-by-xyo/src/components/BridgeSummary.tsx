import { InsertLinkRounded as InsertLinkRoundedIcon } from '@mui/icons-material'
import { BridgeInstance } from '@xyo-network/bridge-model'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'

export const BridgeSummary: React.FC<ModuleSummaryProps<BridgeInstance>> = ({ module, ...props }) => {
  return <ModuleSummary module={module} icon={<InsertLinkRoundedIcon />} {...props}></ModuleSummary>
}

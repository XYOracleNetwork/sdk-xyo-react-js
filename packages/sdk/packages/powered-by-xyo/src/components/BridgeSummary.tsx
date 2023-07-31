import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded'
import { BridgeInstance } from '@xyo-network/bridge-model'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'

export const BridgeSummary: React.FC<ModuleSummaryProps<BridgeInstance>> = ({ module, ...props }) => {
  return <ModuleSummary module={module} icon={<InsertLinkRoundedIcon />} {...props}></ModuleSummary>
}

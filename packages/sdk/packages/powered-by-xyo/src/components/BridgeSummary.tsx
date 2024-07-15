import { InsertLinkRounded as InsertLinkRoundedIcon } from '@mui/icons-material'
import { BridgeInstance } from '@xyo-network/bridge-model'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary.js'

export const BridgeSummary: React.FC<ModuleSummaryProps<BridgeInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<InsertLinkRoundedIcon />} {...props}></ModuleSummary>
}

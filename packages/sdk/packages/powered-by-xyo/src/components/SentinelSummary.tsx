import { TimerRounded as TimerRoundedIcon } from '@mui/icons-material'
import { SentinelInstance } from '@xyo-network/sentinel-model'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'

export const SentinelSummary: React.FC<ModuleSummaryProps<SentinelInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<TimerRoundedIcon />} {...props} />
}

import TimerRoundedIcon from '@mui/icons-material/TimerRounded'
import { SentinelInstance } from '@xyo-network/sentinel'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'

export const SentinelSummary: React.FC<ModuleSummaryProps<SentinelInstance>> = ({ module, ...props }) => {
  return <ModuleSummary module={module} icon={<TimerRoundedIcon />} {...props} />
}

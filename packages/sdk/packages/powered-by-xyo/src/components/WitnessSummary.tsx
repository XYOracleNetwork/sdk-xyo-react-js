import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { WitnessInstance } from '@xyo-network/witness-model'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'

export const WitnessSummary: React.FC<ModuleSummaryProps<WitnessInstance>> = ({ module, ...props }) => {
  return <ModuleSummary module={module} icon={<VisibilityRoundedIcon />} {...props} />
}

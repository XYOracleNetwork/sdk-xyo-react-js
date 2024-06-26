import { VisibilityRounded as VisibilityRoundedIcon } from '@mui/icons-material'
import { WitnessInstance } from '@xyo-network/witness-model'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'

export const WitnessSummary: React.FC<ModuleSummaryProps<WitnessInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<VisibilityRoundedIcon />} {...props} />
}

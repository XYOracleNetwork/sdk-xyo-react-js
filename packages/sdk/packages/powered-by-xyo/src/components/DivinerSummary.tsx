import { BubbleChartRounded as BubbleChartRoundedIcon } from '@mui/icons-material'
import { DivinerInstance } from '@xyo-network/diviner-model'

import { ModuleSummary, ModuleSummaryProps } from './ModuleSummary'

export const DivinerSummary: React.FC<ModuleSummaryProps<DivinerInstance>> = ({ mod, ...props }) => {
  return <ModuleSummary mod={mod} icon={<BubbleChartRoundedIcon />} {...props} />
}

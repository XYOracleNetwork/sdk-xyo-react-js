import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded'
import HubIcon from '@mui/icons-material/Hub'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded'
import TimerRoundedIcon from '@mui/icons-material/TimerRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

import { CyNodeModuleTypes } from './lib'

// eslint-disable-next-line @typescript-eslint/ban-types
export const CyIconSet: Record<CyNodeModuleTypes, OverridableComponent<SvgIconTypeMap<{}, 'svg'>>> = {
  archivist: Inventory2RoundedIcon,
  diviner: BubbleChartRoundedIcon,
  module: QuestionMarkRoundedIcon,
  node: HubIcon,
  sentinel: TimerRoundedIcon,
  witness: VisibilityRoundedIcon,
}

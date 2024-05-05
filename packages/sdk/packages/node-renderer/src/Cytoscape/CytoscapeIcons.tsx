import {
  BubbleChartRounded as BubbleChartRoundedIcon,
  Hub as HubIcon,
  InsertLinkRounded as InsertLinkRoundedIcon,
  Inventory2Rounded as Inventory2RoundedIcon,
  QuestionMarkRounded as QuestionMarkRoundedIcon,
  TimerRounded as TimerRoundedIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@mui/icons-material'
import { SvgIconTypeMap } from '@mui/material'
// eslint-disable-next-line import/no-internal-modules
import { OverridableComponent } from '@mui/material/OverridableComponent'

import { CyNodeModuleTypes } from './lib'

// eslint-disable-next-line @typescript-eslint/ban-types
export const CyIconSet: Record<CyNodeModuleTypes, OverridableComponent<SvgIconTypeMap<{}, 'svg'>>> = {
  archivist: Inventory2RoundedIcon,
  bridge: InsertLinkRoundedIcon,
  diviner: BubbleChartRoundedIcon,
  // eslint-disable-next-line id-denylist
  module: QuestionMarkRoundedIcon,
  node: HubIcon,
  sentinel: TimerRoundedIcon,
  witness: VisibilityRoundedIcon,
}

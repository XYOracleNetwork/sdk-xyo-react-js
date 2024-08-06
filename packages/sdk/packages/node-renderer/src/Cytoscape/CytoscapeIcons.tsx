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
import { OverridableComponent } from '@mui/material/OverridableComponent.js'

import { CyNodeModuleTypes } from './lib/index.js'

export const CyIconSet: Record<CyNodeModuleTypes, OverridableComponent<SvgIconTypeMap<{}, 'svg'>>> = {
  archivist: Inventory2RoundedIcon,
  bridge: InsertLinkRoundedIcon,
  diviner: BubbleChartRoundedIcon,

  module: QuestionMarkRoundedIcon,
  node: HubIcon,
  sentinel: TimerRoundedIcon,
  witness: VisibilityRoundedIcon,
}

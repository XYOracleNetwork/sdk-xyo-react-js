import {
  BubbleChartRounded as BubbleChartRoundedIcon,
  Hub as HubIcon,
  InsertLinkRounded as InsertLinkRoundedIcon,
  Inventory2Rounded as Inventory2RoundedIcon,
  QuestionMarkRounded as QuestionMarkRoundedIcon,
  TimerRounded as TimerRoundedIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@mui/icons-material'
import type { SvgIconTypeMap } from '@mui/material'
import type { OverridableComponent } from '@mui/material/OverridableComponent.js'

import type { CyNodeModuleTypes } from './lib/index.ts'

export const CyIconSet: Record<CyNodeModuleTypes, OverridableComponent<SvgIconTypeMap<{}, 'svg'>>> = {
  archivist: Inventory2RoundedIcon,
  bridge: InsertLinkRoundedIcon,
  diviner: BubbleChartRoundedIcon,

  module: QuestionMarkRoundedIcon,
  node: HubIcon,
  sentinel: TimerRoundedIcon,
  witness: VisibilityRoundedIcon,
}

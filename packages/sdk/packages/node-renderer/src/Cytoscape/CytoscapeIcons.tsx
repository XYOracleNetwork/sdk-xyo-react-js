import CallMergeRoundedIcon from '@mui/icons-material/CallMergeRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import HubIcon from '@mui/icons-material/Hub'
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export type CyNodeIcons = 'archivist' | 'diviner' | 'module' | 'node' | 'witness'

// eslint-disable-next-line @typescript-eslint/ban-types
export const CyIconSet: Record<CyNodeIcons, OverridableComponent<SvgIconTypeMap<{}, 'svg'>>> = {
  archivist: GridViewRoundedIcon,
  diviner: CallMergeRoundedIcon,
  module: QuestionMarkRoundedIcon,
  node: HubIcon,
  witness: VisibilityRoundedIcon,
}

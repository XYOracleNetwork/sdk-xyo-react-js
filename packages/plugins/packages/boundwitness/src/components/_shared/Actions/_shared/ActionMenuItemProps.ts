import type { MenuItemProps } from '@mui/material'
import type { BoundWitness } from '@xyo-network/boundwitness-model'

export interface ActionMenuItemProps extends MenuItemProps {
  boundwitness?: BoundWitness
  onDialogClose?: () => void
}

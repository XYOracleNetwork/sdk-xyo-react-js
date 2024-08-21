import type { IconButtonProps } from '@mui/material'
import { IconButton, useTheme } from '@mui/material'
import type {
  Dispatch, SetStateAction, SyntheticEvent,
} from 'react'
import React from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { VscChevronDown } from 'react-icons/vsc'
export interface SubNavToggleIconButtonProps extends IconButtonProps {
  openSubNav?: boolean
  setOpenSubNav?: Dispatch<SetStateAction<boolean>>
}

export const SubNavToggleIconButton: React.FC<SubNavToggleIconButtonProps> = ({
  setOpenSubNav, openSubNav,
}) => {
  const theme = useTheme()
  return (
    <IconButton
      onClick={(event: SyntheticEvent) => {
        event.stopPropagation()
        setOpenSubNav?.(!openSubNav)
      }}
      sx={{ marginRight: theme.spacing(0.5) }}
    >
      <VscChevronDown fontSize="16px" />
    </IconButton>
  )
}

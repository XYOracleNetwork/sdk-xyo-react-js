import { alpha, Chip, Popper, PopperProps, Theme, Typography } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'

export interface ModuleHoverPopperProps extends PopperProps {
  address?: string
  element?: HTMLElement | null
  name?: string
}

export const ModuleHoverPopper: React.FC<ModuleHoverPopperProps> = ({ address, element, name, ...props }) => {
  return (
    <Popper anchorEl={element} {...props}>
      <FlexCol gap={2} p={2} paper sx={{ backgroundColor: (theme: Theme) => alpha(theme.palette.background.paper, 0.95) }}>
        <FlexRow gap={2}>
          <Identicon value={address} size={24} />
          <Typography>{name}</Typography>
        </FlexRow>
        <Chip label={address} color={'primary'} />
      </FlexCol>
    </Popper>
  )
}

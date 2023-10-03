import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { Button, Card, CardActions, CardHeader, IconButton, Paper, Popper, PopperProps, styled } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'

export interface ModuleHoverPopperProps extends PopperProps {
  address?: string
  name?: string
  onClose?: () => void
  onExploreAddress?: (address?: string) => void
}

export const ModuleHoverPopper: React.FC<ModuleHoverPopperProps> = ({ address, anchorEl, name, onClose, onExploreAddress, ...props }) => {
  return (
    <>
      {anchorEl ? (
        <Popper anchorEl={anchorEl} {...props}>
          <Card elevation={3}>
            <CardHeader
              action={
                onClose ? (
                  <IconButton size="small" onClick={onClose}>
                    <CancelRoundedIcon />
                  </IconButton>
                ) : null
              }
              avatar={
                <Paper elevation={6} sx={{ bgcolor: '#fff', p: 1 }}>
                  <Identicon value={address} size={24} />
                </Paper>
              }
              title={name}
              subheader={address}
            />
            <StyledCardActions>
              {onExploreAddress ? (
                <Button onClick={() => onExploreAddress?.(address)} size="small" variant="contained">
                  Explore
                </Button>
              ) : null}
            </StyledCardActions>
          </Card>
        </Popper>
      ) : null}
    </>
  )
}

export const StyledModuleHoverPopper = styled(ModuleHoverPopper, { name: 'StyledComponents' })(() => ({
  zIndex: 2,
}))

export const StyledCardActions = styled(CardActions, { name: 'StyledCardActions' })(() => ({
  display: 'flex',
  justifyContent: 'center',
}))

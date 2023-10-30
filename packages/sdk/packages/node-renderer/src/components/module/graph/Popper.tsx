import { CancelRounded } from '@mui/icons-material'
import { Button, Card, CardActions, CardHeader, IconButton, Paper, Popper, PopperProps, styled } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { NodeSingular } from 'cytoscape'

export interface ModuleHoverPopperProps extends PopperProps {
  node?: NodeSingular
  onClose?: () => void
  onModuleDetails?: (address?: string) => void
  onModuleExplore?: (address?: string) => void
}

export const ModuleHoverPopper: React.FC<ModuleHoverPopperProps> = ({ anchorEl, onClose, onModuleDetails, onModuleExplore, node, ...props }) => {
  const { address, name } = node?.data() ?? {}
  return (
    <>
      {anchorEl ? (
        <Popper anchorEl={anchorEl} {...props}>
          <Card elevation={3}>
            <CardHeader
              action={
                onClose ? (
                  <IconButton size="small" onClick={onClose}>
                    <CancelRounded />
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
              {onModuleDetails ? (
                <Button onClick={() => onModuleDetails?.(address)} size="small" variant="contained">
                  Details
                </Button>
              ) : null}
              {onModuleExplore ? (
                <Button onClick={() => onModuleExplore?.(address)} size="small" variant="contained">
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

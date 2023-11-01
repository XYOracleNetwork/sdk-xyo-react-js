import { CardActions, CardActionsProps, Chip } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexRow } from '@xylabs/react-flexbox'
import { useState } from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { DiscoverDialog } from './components'

export const ModuleCardActions: React.FC<CardActionsProps & ModuleRenderProps> = ({ children, module, sx, ...props }) => {
  const [discoverDialogOpen, setDiscoverDialogOpen] = useState(false)

  const config = module?.config

  return (
    <CardActions sx={{ alignItems: 'stretch', flexDirection: 'column', ml: 1, ...sx }} {...props}>
      <FlexRow justifyContent="space-between" gap={1} alignItems="center">
        {module ? <Chip label={config?.schema} size={'small'} /> : null}
        {children}
        <ButtonEx onClick={() => setDiscoverDialogOpen(true)} size={'small'} variant={'outlined'}>
          Discover
        </ButtonEx>
      </FlexRow>
      <DiscoverDialog fullWidth maxWidth={'md'} module={module} open={discoverDialogOpen} setOpen={setDiscoverDialogOpen} />
    </CardActions>
  )
}

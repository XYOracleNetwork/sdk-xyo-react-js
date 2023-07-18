import { CardActions, CardActionsProps, Chip } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { useState } from 'react'

import { ModuleRenderProps } from '../../../ModuleRenderProps'
import { DiscoverDialog } from './components'

export const ModuleCardActions: React.FC<CardActionsProps & ModuleRenderProps> = ({ children, module, sx, ...props }) => {
  const [discoverDialogOpen, setDiscoverDialogOpen] = useState(false)

  const config = module?.config

  return (
    <CardActions sx={{ alignItems: 'stretch', flexDirection: 'column', ml: 1, ...sx }} {...props}>
      <FlexGrowRow justifyContent="space-between" alignItems="center">
        {module ? <Chip label={config?.schema} size={'small'} /> : null}
        <ButtonEx onClick={() => setDiscoverDialogOpen(true)} size={'small'} variant={'outlined'}>
          Discover
        </ButtonEx>
        <DiscoverDialog fullWidth maxWidth={'md'} module={module} open={discoverDialogOpen} setOpen={setDiscoverDialogOpen} />
      </FlexGrowRow>
      {children}
    </CardActions>
  )
}

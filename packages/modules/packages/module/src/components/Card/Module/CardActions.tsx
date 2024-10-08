import type { CardActionsProps } from '@mui/material'
import { CardActions, Chip } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexRow } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import type { ModuleRenderProps } from '../../../ModuleRenderProps.tsx'
import { DiscoverDialog } from './components/index.ts'

export const ModuleCardActions: React.FC<CardActionsProps & ModuleRenderProps> = ({
  children, mod, sx, ...props
}) => {
  const [discoverDialogOpen, setDiscoverDialogOpen] = useState(false)

  const config = mod?.config

  return (
    <CardActions
      sx={{
        alignItems: 'stretch', flexDirection: 'column', ml: 1, ...sx,
      }}
      {...props}
    >
      <FlexRow justifyContent="space-between" gap={1} alignItems="center">
        {mod
          ? <Chip label={config?.schema} size="small" />
          : null}
        {children}
        <ButtonEx onClick={() => setDiscoverDialogOpen(true)} size="small" variant="outlined">
          Discover
        </ButtonEx>
      </FlexRow>
      <DiscoverDialog fullWidth maxWidth="md" mod={mod} open={discoverDialogOpen} setOpen={setDiscoverDialogOpen} />
    </CardActions>
  )
}

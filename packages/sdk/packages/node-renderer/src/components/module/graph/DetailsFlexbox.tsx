import { CancelRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

export interface DetailsFlexboxProps extends FlexBoxProps {
  onClose?: () => void
}

export const DetailsFlexbox: React.FC<DetailsFlexboxProps> = ({
  children, onClose,
}) => {
  return (
    <FlexGrowCol alignItems="end" justifyContent="start" id="module-detail" width="100%" p={2} gap={2}>
      <FlexRow justifyContent="end">
        <IconButton onClick={onClose} size="small">
          <CancelRounded />
        </IconButton>
      </FlexRow>
      {children}
    </FlexGrowCol>
  )
}

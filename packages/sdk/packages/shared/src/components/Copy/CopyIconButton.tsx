import { CopyAllOutlined } from '@mui/icons-material'
import type {
  IconButtonProps, SvgIconOwnProps, SvgIconTypeMap,
} from '@mui/material'
import { IconButton } from '@mui/material'
import type { OverridableComponent } from '@mui/material/OverridableComponent'
import React from 'react'

import { onCopy } from './onCopy.ts'

export interface CopyIconButtonProps extends IconButtonProps {
  MuiIcon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  copyIconProps?: SvgIconOwnProps
  onCopyCallback?: () => void
  value?: string
}

export const CopyIconButton: React.FC<CopyIconButtonProps> = ({
  MuiIcon = CopyAllOutlined, copyIconProps, onCopyCallback, value, ...props
}) => {
  const handleCopy = async () => {
    await onCopy(value)
    onCopyCallback?.()
  }
  return (
    <IconButton onClick={() => void handleCopy()} {...props}>
      <MuiIcon {...copyIconProps} />
    </IconButton>
  )
}

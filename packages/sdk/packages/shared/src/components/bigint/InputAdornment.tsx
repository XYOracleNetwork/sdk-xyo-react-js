import type { InputAdornmentProps } from '@mui/material'
import {
  Avatar, IconButton, InputAdornment,
} from '@mui/material'
import React, { useRef, useState } from 'react'

import { FixedPointPopover } from './FixedPointPopover.tsx'

export interface FixedPointInputAdornmentProps extends InputAdornmentProps {
  fixedPoint?: number
  minFixedPoint?: number
  onFixedPointChange?: (value: number) => void
}

export const FixedPointInputAdornment: React.FC<FixedPointInputAdornmentProps> = ({
  fixedPoint, minFixedPoint, onFixedPointChange, ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <InputAdornment {...props}>
      <FixedPointPopover
        anchorEl={ref.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        fixedPoint={fixedPoint}
        minFixedPoint={minFixedPoint}
        onClose={() => setOpen(false)}
        onFixedPointChange={onFixedPointChange}
        open={open}
      />
      <IconButton size="small" ref={ref} onClick={() => setOpen(!open)}>
        <Avatar sx={{
          fontSize: '.75rem',
          height: '20px',
          width: '20px',
        }}
        >
          {fixedPoint}
        </Avatar>
      </IconButton>
    </InputAdornment>
  )
}

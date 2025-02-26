import {
  FormHelperText, Popover, type PopoverProps, TextField,
} from '@mui/material'
import React from 'react'

export interface FixedPointPopoverProps extends PopoverProps {
  fixedPoint?: number
  minFixedPoint?: number
  onFixedPointChange?: (value: number) => void
}

export const FixedPointPopover: React.FC<FixedPointPopoverProps> = ({
  fixedPoint, minFixedPoint: minimumPoint, onFixedPointChange, ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fixedPointInteger = Number.parseInt(event.target.value, 10)
    onFixedPointChange?.(fixedPointInteger)
  }

  return (
    <Popover slotProps={{ paper: { sx: { p: 2 } } }} {...props}>
      <TextField slotProps={{ htmlInput: { min: minimumPoint } }} value={fixedPoint} onChange={handleChange} type="number" />
      <FormHelperText>Set the Fixed Point</FormHelperText>
    </Popover>
  )
}

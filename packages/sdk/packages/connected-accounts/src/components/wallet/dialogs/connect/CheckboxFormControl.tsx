import { Checkbox, FormControl, FormControlProps, FormLabel } from '@mui/material'

export interface CheckboxFormControlProps extends FormControlProps {
  onCheckChanged?: (checked: boolean) => void
}

export const CheckboxFormControl: React.FC<CheckboxFormControlProps> = ({ onCheckChanged, ...props }) => {
  return (
    <FormControl {...props}>
      <FormLabel>
        <Checkbox onChange={(_, checked) => onCheckChanged?.(checked)} />
        Do not show this again.
      </FormLabel>
    </FormControl>
  )
}

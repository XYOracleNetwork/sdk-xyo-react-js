import { Checkbox, FormControl, FormControlProps, FormLabel } from '@mui/material'

export interface IgnoreDialogFormControlProps extends FormControlProps {
  onCheckChanged?: (checked: boolean) => void
}

export const IgnoreDialogFormControl: React.FC<IgnoreDialogFormControlProps> = ({ onCheckChanged, ...props }) => {
  return (
    <FormControl {...props}>
      <FormLabel>
        <Checkbox onChange={(_, checked) => onCheckChanged?.(checked)} />
        Do not show this again.
      </FormLabel>
    </FormControl>
  )
}

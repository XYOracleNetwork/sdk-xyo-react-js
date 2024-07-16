import { StandardTextFieldProps } from '@mui/material'

export interface WithFormControlProps extends StandardTextFieldProps {
  fieldLabel?: string
  formControlName?: string
}

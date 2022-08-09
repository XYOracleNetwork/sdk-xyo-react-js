import { FormControl, FormControlProps, InputLabel } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

interface EmbedControlWrapProps extends FormControlProps {
  formId?: string
  formLabel?: string
}

export const EmbedControlWrap: React.FC<WithChildren<EmbedControlWrapProps>> = ({ formId, formLabel, children, ...props }) => {
  return (
    <FormControl {...props}>
      <InputLabel id={formId}>{formLabel}</InputLabel>
      {children}
    </FormControl>
  )
}

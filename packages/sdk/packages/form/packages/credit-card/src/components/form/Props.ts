import { ButtonProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { InputError } from '@xyo-network/react-form-group'
import { ComponentType } from 'react'

import { CreditCardInput } from '../../models/index.js'

export interface CreditCardFormProps extends FlexBoxProps {
  ConfirmationButton?: ComponentType<ButtonProps>
  onFailedSubmit?: (errorSummary: InputError) => void
  onSuccessfulSubmit?: () => void
  onValidSubmit?: (values: CreditCardInput) => Promise<void>
}

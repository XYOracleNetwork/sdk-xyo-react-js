import { ButtonProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ErrorSummary } from '@xyo-network/react-form-group'
import { ComponentType } from 'react'

import { CreditCardInput } from '../../models/index.js'

export interface CreditCardFormProps extends FlexBoxProps {
  ConfirmationButton?: ComponentType<ButtonProps>
  onErrorDuringSubmit?: (error: Error) => void
  onInvalidSubmit?: (errorSummary: ErrorSummary) => void
  onSuccessfulSubmit?: () => void
  onValidSubmit?: (values: CreditCardInput) => Promise<void>
}

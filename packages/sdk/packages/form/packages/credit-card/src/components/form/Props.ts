import type { ButtonProps } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { ErrorSummary } from '@xyo-network/react-form-group'
import type { ComponentType } from 'react'

import type { CreditCardInput } from '../../models/index.ts'

export interface CreditCardFormProps extends FlexBoxProps {
  ConfirmationButton?: ComponentType<ButtonProps>
  displayErrors?: boolean
  onErrorDuringSubmit?: (error: Error) => void
  onInvalidSubmit?: (errorSummary: ErrorSummary) => void
  onSuccessfulSubmit?: () => void
  onValidSubmit?: (values: CreditCardInput) => Promise<void>
}

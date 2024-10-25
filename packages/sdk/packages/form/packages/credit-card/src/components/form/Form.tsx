import { Stack } from '@mui/material'
import { ErrorRender } from '@xylabs/react-error'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { FormGroupCreditCardProvider, useFormGroupWithCreditCardInput } from '../../context/index.ts'
import { validateCreditCardInputs } from '../support/index.ts'
import { InputFieldsStack } from './InputFieldsStack.tsx'
import type { CreditCardFormProps } from './Props.ts'
import { useFormStorage } from './useFormStorage.tsx'

export const CreditCardFormFlexbox: React.FC<CreditCardFormProps> = ({
  ConfirmationButton,
  displayErrors,
  onErrorDuringSubmit,
  onInvalidSubmit,
  onSuccessfulSubmit,
  onValidSubmit,
  ...props
}) => {
  const { formGroup } = useFormGroupWithCreditCardInput(true)
  const [error, setError] = useState<Error>()

  const handleConfirmPayment = async () => {
    try {
      if (!formGroup) {
        throw new Error('formGroup is not defined')
      }

      formGroup.validateFields()

      const errorSummary = formGroup.errorSummary

      if (errorSummary.invalidFields.length > 0) {
        onInvalidSubmit?.(errorSummary)
      }

      if (errorSummary.invalidFields.length > 0) return

      const formOutput = validateCreditCardInputs(formGroup.values)

      await onValidSubmit?.(formOutput)

      onSuccessfulSubmit?.()
    } catch (error) {
      onErrorDuringSubmit?.(error as Error)
      if (displayErrors) setError(error as Error)
    }
  }

  return (
    <>
      <ErrorRender error={error} />
      <FlexCol
        sx={{ flexDirection: { md: 'row', xs: 'column' } }}
        width="100%"
        gap={2}
        {...props}
      >
        <Stack flexDirection="column" sx={{ width: '100%' }} gap={2}>
          <InputFieldsStack />
          {ConfirmationButton
            ? (
                <ConfirmationButton onClick={handleConfirmPayment} variant="contained" sx={{ alignSelf: 'end' }}>
                  Confirm Payment
                </ConfirmationButton>
              )
            : null}
        </Stack>
      </FlexCol>
    </>
  )
}

export const CreditCardFormFlexboxWithFormGroupProvider: React.FC<CreditCardFormProps> = (props) => {
  const [params, error] = useFormStorage()
  return (
    <FormGroupCreditCardProvider params={params}>
      <ErrorRender error={error} />
      <CreditCardFormFlexbox {...props} />
    </FormGroupCreditCardProvider>
  )
}

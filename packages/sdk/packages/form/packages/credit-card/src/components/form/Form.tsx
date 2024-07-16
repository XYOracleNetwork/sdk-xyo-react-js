import { Stack } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { ErrorRender } from '@xyo-network/react-error'
import { FormGroupCreditCardProvider } from '@xyo-network/react-form-group'

import { useFormGroupWithCreditCardInput } from '../../context/index.js'
import { validateCreditCardInputs } from '../support/index.js'
import { InputFieldsStack } from './InputFieldsStack.js'
import { CreditCardFormProps } from './Props.js'
import { useFormStorage } from './useFormStorage.js'

export const CreditCardFormFlexbox: React.FC<CreditCardFormProps> = ({
  ConfirmationButton,
  onFailedSubmit,
  onSuccessfulSubmit,
  onValidSubmit,
  ...props
}) => {
  const { formGroup } = useFormGroupWithCreditCardInput(true)

  const handleConfirmPayment = async () => {
    if (!formGroup) {
      console.error('formGroup is not defined')
      return
    }

    formGroup.validateFields()

    const errorSummary = formGroup.errorSummary

    if (errorSummary.invalidFields.length > 0) {
      onFailedSubmit?.(errorSummary)
    }

    if (errorSummary.invalidFields.length > 0) return

    const formOutput = validateCreditCardInputs(formGroup.values)

    await onValidSubmit?.(formOutput)

    onSuccessfulSubmit?.()
  }

  return (
    <FlexCol sx={{ flexDirection: { md: 'row', xs: 'column' } }} width={'100%'} gap={2} {...props}>
      <Stack flexDirection={'column'} sx={{ width: '100%' }} gap={2}>
        <InputFieldsStack />
        {ConfirmationButton ?
          <ConfirmationButton onClick={handleConfirmPayment} variant="contained" sx={{ alignSelf: 'end' }}>
            Confirm Payment
          </ConfirmationButton>
        : null}
      </Stack>
    </FlexCol>
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

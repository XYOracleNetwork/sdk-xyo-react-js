import { CreditCardInput } from '../../accounts'
export const useFormGroupWithCreditCardInput = (required = false, name: keyof typeof FormGroupContext = 'creditCardInput') => {
  const context = assertEx(FormGroupContext[name], () => `FormGroupContext.${name} is not defined`) as Context<
    FormGroupContextWithPayloadState<CreditCardInput, CreditCardInput>
  >
  return useContextEx(context, 'FormGroup', required)
}

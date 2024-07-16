import { Payload } from '@xyo-network/payload-model'
import {
  FormGroupContext,
  FormGroupContextWithPayloadState,
  FormGroupParams,
  FormGroupPayloadProvider,
  FormGroupPayloadProviderProps,
} from '@xyo-network/react-form-group'
import { Context, PropsWithChildren } from 'react'

export interface FormGroupCreditCardProviderProps<TStorage extends Payload = Payload> extends PropsWithChildren {
  Context: Context<FormGroupContextWithPayloadState>
  params?: FormGroupParams<TStorage>
}

export const FormGroupCreditCardProvider: React.FC<FormGroupPayloadProviderProps> = ({ children, ...props }: PropsWithChildren) => {
  const Context = FormGroupContext['creditCardInput']
  return (
    <FormGroupPayloadProvider Context={Context} {...props}>
      {children}
    </FormGroupPayloadProvider>
  )
}

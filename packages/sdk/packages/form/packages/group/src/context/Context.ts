import { Payload } from '@xyo-network/payload-model'
import { createContextEx } from '@xyo-network/react-shared'

import { FormGroupContextWithPayloadState } from './State.js'

export const FormGroupBaseContext = createContextEx<FormGroupContextWithPayloadState>()

const creditCardInput = createContextEx<FormGroupContextWithPayloadState<Payload, Payload>>()

export const FormGroupContext = {
  creditCardInput,
}

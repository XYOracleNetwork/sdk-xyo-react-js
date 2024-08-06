import { Payload } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'

import { FormGroup } from '../FormGroup.tsx'

export interface FormGroupContextWithPayloadState<TValue extends Payload = Payload, TStorageValue extends Payload = Payload> extends ContextExState {
  formGroup?: FormGroup<TValue, TStorageValue>
}

import type { Payload } from '@xyo-network/payload-model'
import type { ContextExState } from '@xyo-network/react-shared'

import type { FormGroup } from '../FormGroup.ts'

export interface FormGroupContextWithPayloadState<TValue extends Payload = Payload, TStorageValue extends Payload = Payload> extends ContextExState {
  formGroup?: FormGroup<TValue, TStorageValue>
}

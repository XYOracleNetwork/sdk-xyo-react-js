import type { ContextExState } from '@xylabs/react-shared'
import type { Payload } from '@xyo-network/payload-model'

import type { FormGroup } from '../FormGroup.ts'

export type FormGroupContextWithPayloadState<TValue extends Payload = Payload, TStorageValue extends Payload = Payload> = ContextExState<{
  formGroup?: FormGroup<TValue, TStorageValue>
}>

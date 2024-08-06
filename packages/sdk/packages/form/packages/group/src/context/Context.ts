import { createContextEx } from '@xyo-network/react-shared'

import { FormGroupContextWithPayloadState } from './State.ts'

export const FormGroupBaseContext = createContextEx<FormGroupContextWithPayloadState>()

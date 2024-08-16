import { createContextEx } from '@xyo-network/react-shared'

import type { FormGroupContextWithPayloadState } from './State.ts'

export const FormGroupBaseContext = createContextEx<FormGroupContextWithPayloadState>()

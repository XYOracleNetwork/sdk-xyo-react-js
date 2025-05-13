import { createContextEx } from '@xylabs/react-shared'

import type { FormGroupContextWithPayloadState } from './State.ts'

export const FormGroupBaseContext = createContextEx<FormGroupContextWithPayloadState>()

import { useContextEx } from '@xylabs/react-shared'

import { FormGroupBaseContext } from './Context.ts'

export const useFormGroup = (required = false) => useContextEx(FormGroupBaseContext, 'FormGroup', required)

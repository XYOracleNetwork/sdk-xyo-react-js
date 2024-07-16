import { useContextEx } from '@xyo-network/react-shared'

import { FormGroupBaseContext } from './Context.js'

export const useFormGroup = (required = false) => useContextEx(FormGroupBaseContext, 'FormGroup', required)

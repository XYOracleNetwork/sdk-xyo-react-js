import { assertEx } from '@xylabs/assert'
import { usePromise } from '@xylabs/react-promise'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import { isAnyPayload } from '@xyo-network/payload-model'

import type { ValidatedResponse } from './types/index.ts'

export const useValidateBoundWitness = (input?: string): ValidatedResponse<BoundWitness> => {
  const [output, validationError] = usePromise(async () => {
    if (!input) return

    const object = JSON.parse(input)
    const validPayload = assertEx(isAnyPayload(object) ? object : null, () => 'Invalid payload')

    const errors = await new BoundWitnessValidator(validPayload as BoundWitness).validate()
    return {
      payload: validPayload as BoundWitness,
      errors,
    }
  }, [input])

  const { payload, errors } = output ?? {}

  return {
    payload,
    errors: [validationError, ...errors ?? []].filter<Error>(error => !!error),
  }
}

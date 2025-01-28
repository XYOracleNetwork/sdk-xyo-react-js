import { usePromise } from '@xylabs/react-promise'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'

import { useDebugPayload } from './useDebugPayload.tsx'

export const useDebugBoundWitness = (input?: string) => {
  const {
    payload, error: payloadError, rootHash, dataHash,
  } = useDebugPayload(input)

  const [validation, validationError] = usePromise(async () => {
    if (!payload) return

    const errors = await new BoundWitnessValidator(payload as BoundWitness).validate()
    return {
      boundWitness: payload,
      valid: errors.length === 0,
      errors,
    }
  }, [payload])

  const {
    boundWitness, valid: validBoundWitness, errors: boundWitnessValidationErrors,
  } = validation ?? {}

  return {
    boundWitness,
    errors: [payloadError, ...boundWitnessValidationErrors ?? [], validationError].filter<Error>(error => !!error),
    valid: validBoundWitness,
    rootHash,
    dataHash,
  }
}

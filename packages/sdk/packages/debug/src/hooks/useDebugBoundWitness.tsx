import { usePayloadRootHash, useValidateBoundWitness } from '@xyo-network/react-shared'

export const useDebugBoundWitness = (input?: string) => {
  const { payload: boundWitness, errors } = useValidateBoundWitness(input)

  const rootHash = usePayloadRootHash(boundWitness)
  const dataHash = usePayloadRootHash(boundWitness)

  return {
    boundWitness,
    errors: errors ?? [],
    valid: errors ? errors.length === 0 : true,
    rootHash,
    dataHash,
  }
}

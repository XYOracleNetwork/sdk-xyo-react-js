import { usePayloadRootHash, usePayloadValidate } from '@xyo-network/react-shared'

export const useDebugPayload = (input?: string) => {
  const { payload, error } = usePayloadValidate(input)
  const valid = !!payload
  const rootHash = usePayloadRootHash(payload)
  const dataHash = usePayloadRootHash(payload)

  return {
    payload, error, valid, rootHash, dataHash,
  }
}

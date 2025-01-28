import { usePayloadRootHash, usePayloadValidate } from '@xyo-network/react-shared'

export const useDebugPayload = (input?: string) => {
  const { payload, errors } = usePayloadValidate(input)
  const rootHash = usePayloadRootHash(payload)
  const dataHash = usePayloadRootHash(payload)

  return {
    payload, errors: errors ?? [], valid: errors ? errors.length === 0 : true, rootHash, dataHash,
  }
}

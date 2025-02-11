import type { Payload } from '@xyo-network/payload-model'

export const UpdateTotalPayloadsConditions = {
  // Total Payloads is empty and needs new payloads
  fromScratch: (newPayloads: Payload[] | undefined, totalPayloads: Payload[] | undefined) => newPayloads && totalPayloads?.length === 0,
  // Total Payloads is filled and needs new payloads
  mergeWithExistingPayloads: (isNewLastPayload?: boolean, newPayloads?: Payload[]) => isNewLastPayload && newPayloads,
}

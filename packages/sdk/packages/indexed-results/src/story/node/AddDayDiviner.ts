import { AbstractDiviner } from '@xyo-network/diviner'
import { DivinerParams } from '@xyo-network/diviner-model'
import { Payload } from '@xyo-network/payload-model'
import { isTimestamp } from '@xyo-network/witness-timestamp'

export const AddDayDivinerConfigSchema = 'network.xyo.add.day.diviner.config' as const
export type AddDayDivinerConfigSchema = 'network.xyo.add.day.diviner.config'

export class AddDayDiviner<TParams extends DivinerParams = DivinerParams> extends AbstractDiviner<TParams> {
  static override configSchemas = [AddDayDivinerConfigSchema]
  protected override divineHandler = (payloads?: Payload[]): Payload[] => {
    const timeStampPayloads = payloads?.filter(isTimestamp) ?? []

    return timeStampPayloads.map((timeStampPayload) => {
      const day = 1000 * 60 * 60 * 24
      return {
        ...timeStampPayload,
        timestamp: timeStampPayload.timestamp + day,
      }
    })
  }
}

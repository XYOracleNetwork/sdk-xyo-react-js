import { AbstractDiviner } from '@xyo-network/diviner-abstract'
import type { DivinerParams } from '@xyo-network/diviner-model'
import type { Payload, Schema } from '@xyo-network/payload-model'
import type { TimeStamp } from '@xyo-network/witness-timestamp'
import { isTimestamp } from '@xyo-network/witness-timestamp'

export const AddDayDivinerResultSchema = 'network.xyo.timestamp.add.day'
export type AddDayDivinerResultSchema = 'network.xyo.timestamp.add.day'

export type AddDayDivinerResult = TimeStamp & {
  schema: AddDayDivinerResultSchema
}

export const AddDayDivinerConfigSchema = 'network.xyo.add.day.diviner.config' as const
export type AddDayDivinerConfigSchema = 'network.xyo.add.day.diviner.config'

export class AddDayDiviner<TParams extends DivinerParams = DivinerParams> extends AbstractDiviner<TParams> {
  static override readonly configSchemas: Schema[] = [...super.configSchemas, AddDayDivinerConfigSchema]
  static override readonly defaultConfigSchema: Schema = AddDayDivinerResultSchema
  protected override divineHandler = (payloads?: Payload[]): Payload[] => {
    const timeStampPayloads = payloads?.filter(isTimestamp) ?? []

    return timeStampPayloads.map((timeStampPayload) => {
      const day = 1000 * 60 * 60 * 24
      return {
        ...timeStampPayload,
        schema: AddDayDivinerResultSchema,
        timestamp: timeStampPayload.timestamp + day,
      }
    })
  }
}

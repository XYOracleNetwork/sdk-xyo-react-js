import { AbstractDiviner } from '@xyo-network/diviner-abstract'
import type { DivinerParams } from '@xyo-network/diviner-model'
import {
  asSchema, type Payload, type Schema,
} from '@xyo-network/payload-model'
import type { TimeStamp } from '@xyo-network/witness-timestamp'
import { isTimestamp } from '@xyo-network/witness-timestamp'

export const AddDayDivinerResultSchema = asSchema('network.xyo.timestamp.add.day', true)
export type AddDayDivinerResultSchema = typeof AddDayDivinerResultSchema

export type AddDayDivinerResult = TimeStamp & {
  schema: AddDayDivinerResultSchema
}

export const AddDayDivinerConfigSchema = asSchema('network.xyo.add.day.diviner.config', true)
export type AddDayDivinerConfigSchema = typeof AddDayDivinerConfigSchema

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

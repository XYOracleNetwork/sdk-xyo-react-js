import { assertEx } from '@xylabs/sdk-js'
import { XyoArchivistApi } from '@xyo-network/api'
import { XyoDiviner, XyoDivinerDivineQuerySchema } from '@xyo-network/diviner'
import { XyoModuleParams } from '@xyo-network/module'
import { XyoPayload } from '@xyo-network/payload'
import { XyoSchemaSchema } from '@xyo-network/schema-payload-plugin'

import { XyoSchemaListApiDivinerConfig, XyoSchemaListApiDivinerConfigSchema } from './SchemaListApiDivinerConfig'

export type XyoSchemaListApiDivinerParams = XyoModuleParams<XyoSchemaListApiDivinerConfig> & { api: XyoArchivistApi }

export class SchemaListApiDiviner extends XyoDiviner<XyoSchemaListApiDivinerConfig> {
  protected readonly api: XyoArchivistApi

  get archive() {
    return assertEx(this.config?.archive, `config required [${this.config}]`)
  }

  static override async create(params: XyoSchemaListApiDivinerParams): Promise<SchemaListApiDiviner> {
    return (await super.create(params)) as SchemaListApiDiviner
  }

  protected constructor(params: XyoSchemaListApiDivinerParams) {
    super(params)
    this.api = params.api
  }

  override queries() {
    return [XyoDivinerDivineQuerySchema, ...super.queries()]
  }

  protected override async start() {
    await super.start()
    return this
  }

  public async divine(): Promise<XyoPayload[]> {
    const apiResult = (await this.api.archive(this.archive)?.payload.schema.get()) ?? []
    return (
      apiResult.map((schema) => {
        return {
          name: schema,
          schema: XyoSchemaSchema,
        }
      }) ?? []
    )
  }

  static override configSchema = XyoSchemaListApiDivinerConfigSchema
  static override targetSchema = XyoSchemaSchema
}

import { AccountInstance } from '@xyo-network/account-model'
import { assertDefinedEx } from '@xyo-network/react-shared'
import { MemorySentinel, SentinelConfigSchema, SentinelParams } from '@xyo-network/sentinel'

export type SentinelCallbacks = Pick<SentinelParams, 'onReportEnd' | 'onReportStart' | 'onWitnessReportStart' | 'onWitnessReportEnd'>

export interface SentinelBuilderConfig {
  name: string
  witnesses: string[]
}

export class SentinelBuilder {
  private _sentinel: MemorySentinel | undefined

  protected constructor(private config: SentinelBuilderConfig, private account: AccountInstance) {
    assertDefinedEx(config, 'config was not defined')
  }

  get sentinel() {
    return assertDefinedEx(this._sentinel, 'this._sentinel not defined upon create')
  }

  static async create(config: SentinelBuilderConfig, account: AccountInstance, callbacks: SentinelCallbacks): Promise<SentinelBuilder> {
    const instance = new this(config, account)
    instance._sentinel = await instance.buildSentinel(callbacks)
    return instance
  }

  async buildSentinel(callbacks: SentinelCallbacks) {
    const params = this.buildParams(callbacks)
    return await MemorySentinel.create(params)
  }

  private buildParams(callbacks: SentinelCallbacks): SentinelParams {
    return {
      config: {
        ...this.config,
        schema: SentinelConfigSchema,
      },
      ...callbacks,
      account: this.account,
    }
  }
}

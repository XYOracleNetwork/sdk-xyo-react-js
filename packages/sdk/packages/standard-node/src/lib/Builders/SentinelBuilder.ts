import { assertDefinedEx } from '@xylabs/sdk-js'
import type { AccountInstance } from '@xyo-network/account-model'
import type { MemorySentinelParams } from '@xyo-network/sentinel-memory'
import { MemorySentinel } from '@xyo-network/sentinel-memory'
import type { SentinelConfig } from '@xyo-network/sentinel-model'

export class SentinelBuilder {
  private _sentinel: MemorySentinel | undefined

  private account: AccountInstance
  private config: SentinelConfig

  protected constructor(
    config: SentinelConfig,
    account: AccountInstance,
  ) {
    assertDefinedEx(config, () => 'config was not defined')
    this.config = config
    this.account = account
  }

  get sentinel() {
    return assertDefinedEx(this._sentinel, () => 'this._sentinel not defined upon create')
  }

  static async create(config: SentinelConfig, account: AccountInstance): Promise<SentinelBuilder> {
    const instance = new this(config, account)
    instance._sentinel = await instance.buildSentinel()
    return instance
  }

  async buildSentinel() {
    const params = this.buildParams()
    return (await MemorySentinel.create(params)) as MemorySentinel
  }

  private buildParams(): MemorySentinelParams {
    return {
      account: this.account,
      config: this.config,
    }
  }
}

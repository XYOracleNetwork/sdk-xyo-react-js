import { AccountInstance } from '@xyo-network/account-model'
import { assertDefinedEx } from '@xyo-network/react-shared'
import { MemorySentinel, SentinelConfig, SentinelParams } from '@xyo-network/sentinel'

export class SentinelBuilder {
  private _sentinel: MemorySentinel | undefined

  protected constructor(
    private config: SentinelConfig,
    private account: AccountInstance,
  ) {
    assertDefinedEx(config, 'config was not defined')
  }

  get sentinel() {
    return assertDefinedEx(this._sentinel, 'this._sentinel not defined upon create')
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

  private buildParams(): SentinelParams {
    return {
      account: this.account,
      config: this.config,
    }
  }
}

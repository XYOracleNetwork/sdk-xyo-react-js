import { assertEx } from '@xyo-network/sdk-xyo-js'

import Gtag from './Gtag'
import Gtm from './Gtm'

class BaseEvent<T> {
  public name: string
  protected adwordConversionId?: string
  constructor(name: string, adwordConversionId?: string) {
    this.name = name
    this.adwordConversionId = adwordConversionId
  }

  async send(data: T) {
    return await this.sendGtag(data)
  }

  async sendGtag(data: T) {
    await this.gtag().sendAnalytics(this.name, data)
    if (this.adwordConversionId) {
      await this.gtag().sendAdwords(this.adwordConversionId, data)
    }
  }

  async sendGtm(data: T) {
    await this.gtm().send(this.name, data)
  }

  public gtag() {
    return assertEx(Gtag.instance, 'Missing/uninitialized gtag')
  }

  public gtm() {
    return assertEx(Gtm.instance, 'Missing/uninitialized gtm')
  }
}

export default BaseEvent

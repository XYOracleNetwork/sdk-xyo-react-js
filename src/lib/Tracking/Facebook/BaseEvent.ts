import { assertEx, delay } from '@xyo-network/sdk-xyo-js'

import Fbq from './Fbq'

class BaseEvent<T> {
  public name: string
  public fbq: Fbq
  constructor(name: string) {
    this.name = name
    this.fbq = assertEx(Fbq.instance, 'Missing Fbq')
  }

  async send(_data: T) {
    await delay(0) //force async to increase reporting odds
  }
}

export default BaseEvent

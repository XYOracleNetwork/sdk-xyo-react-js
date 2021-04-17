import { delay } from '@xyo-network/sdk-xyo-js'

import BaseEvent from './BaseEvent'

class StandardEvent<T> extends BaseEvent<T> {
  async send(data: T) {
    this.fbq.track(this.name, data)
    await delay(0) //force async to increase reporting odds
  }
}

export default StandardEvent

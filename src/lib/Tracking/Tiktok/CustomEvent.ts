import { delay } from '@xyo-network/sdk-xyo-js'

import BaseEvent from './BaseEvent'

class CustomEvent<T> extends BaseEvent<T> {
  async send(data: T) {
    this.ttq.track(this.name, data)
    await delay(0) //force async to increase reporting odds
  }
}

export default CustomEvent

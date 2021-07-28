import { delay } from '@xyo-network/sdk-xyo-js'

import BaseEvent from './BaseEvent'

class CustomEvent<T extends Record<string, unknown>> extends BaseEvent<T> {
  async send(data: T) {
    this.rdt.track(this.name, data)
    await delay(0) //force async to increase reporting odds
  }
}

export default CustomEvent

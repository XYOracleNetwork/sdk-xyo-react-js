import { delay } from '@xylabs/sdk-js'

import BaseEvent from './BaseEvent'

class CustomEvent<T extends Record<string, unknown>> extends BaseEvent<T> {
  async send(data: T) {
    this.fbq.trackCustom(this.name, data)
    await delay(0) //force async to increase reporting odds
  }
}

export default CustomEvent

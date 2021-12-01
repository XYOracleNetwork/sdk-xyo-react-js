import { delay } from '@xylabs/sdk-js'

import BaseEvent from './BaseEvent'

class StandardEvent<T extends Record<string, unknown>> extends BaseEvent<T> {
  async send(data: T) {
    this.fbq.track(this.name, data)
    await delay(0) //force async to increase reporting odds
  }
}

export default StandardEvent

import { delay } from '@xyo-network/sdk-xyo-js'

import BaseEvent from './BaseEvent'
import Snaptr from './Snaptr'
import SnapchatStandardProperties from './StandardProperties'

class StandardEvent<T extends SnapchatStandardProperties> extends BaseEvent<T> {
  async send(data: T) {
    Snaptr.track(this.name, data)
    await delay(0) //force async to increase reporting odds
  }
}

export default StandardEvent

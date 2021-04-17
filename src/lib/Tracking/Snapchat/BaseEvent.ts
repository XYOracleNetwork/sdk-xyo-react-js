import { assertEx, delay } from '@xyo-network/sdk-xyo-js'

import SnapTr from './Snaptr'

class BaseEvent<T> {
  public name: string
  public snaptr: SnapTr
  constructor(name: string) {
    this.name = name
    this.snaptr = assertEx(SnapTr.instance, 'Missing SnapTr')
  }

  async send(_data: T) {
    await delay(0) //force async to increase reporting odds
  }
}

export default BaseEvent

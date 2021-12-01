import { assertEx, delay } from '@xylabs/sdk-js'

import Rdt from './Rdt'

class BaseEvent<T> {
  public name: string
  public rdt: Rdt
  constructor(name: string) {
    this.name = name
    this.rdt = assertEx(Rdt.instance, 'Missing Rdt')
  }

  async send(_data: T) {
    await delay(0) //force async to increase reporting odds
  }
}

export default BaseEvent

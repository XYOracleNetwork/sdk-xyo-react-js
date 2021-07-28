import { delay } from '@xyo-network/sdk-xyo-js'

import global from '../../global'

class Rdt {
  public static instance: Rdt
  public static init(pixelId: string) {
    try {
      Rdt.instance = new Rdt()
      Rdt.getRdt().load(pixelId)
      Rdt.getRdt().track('PageVisit')
    } catch (ex) {
      console.error(ex)
    }
  }

  public static getRdt() {
    return global.rdt
  }

  public init(id: string) {
    try {
      Rdt.getRdt()('init', id)
    } catch (ex) {
      console.error(ex)
    }
  }

  public async track(event: string, data?: Record<string, unknown>) {
    try {
      Rdt.getRdt()('track', event, {
        ...data,
      })
      await delay(0)
    } catch (ex) {
      console.error(ex)
    }
  }
}

export default Rdt

import { delay } from '@xyo-network/sdk-xyo-js'

import global from '../../global'

class Rdt {
  public static instance: Rdt
  public static init(pixelId: string) {
    try {
      Rdt.instance = new Rdt()
      this.getRdt().load(pixelId)
      this.getRdt().track('PageVisit')
    } catch (ex) {
      console.log(ex)
    }
  }

  public static getRdt() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return global.rdt
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

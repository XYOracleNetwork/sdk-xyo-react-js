import { delay } from '@xylabs/sdk-js'

import global from '../../global'

class Ttq {
  public static instance: Ttq
  public static init(pixelId: string) {
    try {
      Ttq.instance = new Ttq()
      Ttq.getTtq().load(pixelId)
      Ttq.page()
    } catch (ex) {
      console.error(`Ttq.init: ${ex}`)
    }
  }

  public static getTtq() {
    return global.ttq
  }

  public static async page() {
    try {
      Ttq.getTtq().page()
      await delay(0)
    } catch (ex) {
      console.error(`Ttq.page: ${ex}`)
    }
  }

  public async track(event: string, data?: Record<string, unknown>) {
    try {
      Ttq.getTtq().track(event, {
        ...data,
      })
      await delay(0)
    } catch (ex) {
      console.error(`Ttq.track: ${ex}`)
    }
  }
}

export default Ttq

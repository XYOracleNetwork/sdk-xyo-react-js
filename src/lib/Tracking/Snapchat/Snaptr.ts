import { delay } from '@xyo-network/sdk-xyo-js'

import global from '../../global'

class SnapTr {
  public static getSnapTr() {
    return global.snaptr
  }

  public static instance: SnapTr
  public static init(pixelId: string) {
    this.getSnapTr()('init', pixelId)
    this.track('PAGE_VIEW')
  }

  public static async track<T>(event: string, data?: T) {
    this.getSnapTr()('track', event, {
      ...data,
    })
    await delay(0)
  }
}

export default SnapTr

import { delay } from '@xylabs/sdk-js'

import global from '../../global'

class SnapTr {
  static pixelId?: string

  public static getSnapTr() {
    return global.snaptr
  }

  public static instance: SnapTr
  public static init(pixelId: string) {
    this.pixelId = pixelId
    this.track('PAGE_VIEW')
  }

  public static async track<T>(event: string, data?: T) {
    this.getSnapTr()('init', this.pixelId)
    this.getSnapTr()('track', event, data)
    await delay(0)
  }
}

export default SnapTr

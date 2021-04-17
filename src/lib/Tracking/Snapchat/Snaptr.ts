import { delay } from '@xyo-network/sdk-xyo-js'

class SnapTr {
  public pixelId?: string
  public userEmail?: string
  public snaptr?: any

  private constructor(pixelId: string, userEmail?: string) {
    this.pixelId = pixelId
    this.userEmail = userEmail

    this.snaptr = function () {
      // eslint-disable-next-line prefer-rest-params,prefer-spread
      this.snaptr.callMethod ? this.snaptr.callMethod.apply(this.snaptr, arguments) : this.snaptr.queue.push(arguments)
    }

    this.snaptr.queue = []

    const global = window as any
    global.snaptr = this.snaptr

    this.snaptr('init', pixelId, { user_email: userEmail })
    this.track('PAGE_VIEW')
  }

  public static instance: SnapTr
  public static init(pixelId: string) {
    if (!this.instance) {
      this.instance = new SnapTr(pixelId)
    }
    return this.instance
  }

  public async track(event: string, data?: any) {
    this.snaptr('track', event, {
      ...data,
    })
    await delay(0)
  }
}

export default SnapTr

import { delay } from '@xyo-network/sdk-xyo-js'

class Fbq {
  public pixelId?: string
  public fbq?: any

  private constructor(pixelId: string) {
    this.pixelId = pixelId

    this.fbq = function () {
      // eslint-disable-next-line prefer-rest-params,prefer-spread
      this.fbq.callMethod ? this.fbq.callMethod.apply(this.fbq, arguments) : this.fbq.queue.push(arguments)
    }

    this.fbq.push = this.fbq
    this.fbq.loaded = true
    this.fbq.version = '2.0'
    this.fbq.queue = []

    //we have to set these to globals because that is where the facebook script looks for them
    const global = window as any
    global.fbq = this.fbq
    global._fbq = this.fbq

    this.fbq('init', pixelId)
    this.fbq('track', 'PageView')
  }

  public static instance: Fbq
  public static init(pixelId: string) {
    if (!this.instance) {
      this.instance = new Fbq(pixelId)
    }
    return this.instance
  }

  public async track(event: string, data: any) {
    this.fbq('track', event, {
      ...data,
    })
    await delay(0)
  }

  public async trackCustom(event: string, data: any) {
    this.fbq('trackCustom', event, {
      ...data,
    })
    await delay(0)
  }
}

export default Fbq

import { delay } from '@xyo-network/sdk-xyo-js'

class Ttq {
  public pixelId?: string
  public userEmail?: string
  public ttq?: any
  public libName = 'ttq'

  private constructor(pixelId: string, userEmail?: string) {
    this.pixelId = pixelId
    this.userEmail = userEmail

    this.ttq = function () {
      // eslint-disable-next-line prefer-rest-params,prefer-spread
      this.ttq.callMethod ? this.ttq.callMethod.apply(this.ttq, arguments) : this.ttq.queue.push(arguments)
    }

    this.ttq = []
    this.ttq.methods = [
      'page',
      'track',
      'identify',
      'instances',
      'debug',
      'on',
      'off',
      'once',
      'ready',
      'alias',
      'group',
      'enableCookie',
      'disableCookie',
    ]
    this.ttq.setAndDefer = function (t: any, e: any) {
      t[e] = function () {
        // eslint-disable-next-line prefer-rest-params,prefer-spread
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
      }
    }
    for (let i = 0; i < this.ttq.methods.length; i++) {
      this.ttq.setAndDefer(this.ttq, this.ttq.methods[i])
    }

    this.ttq.instance = (t: any) => {
      let e
      let n = 0

      for (e = this.ttq._i[t] || []; n < this.ttq.methods.length; n++) {
        this.ttq.setAndDefer(e, this.ttq.methods[n])
      }
      return e
    }

    const ttq = this.ttq

    this.ttq.load = function (e: any, n: any) {
      const i = 'https://analytics.tiktok.com/i18n/pixel/events.js'
      ttq._i = ttq._i || {}
      ttq._i[e] = []
      ttq._i[e]._u = i
      ttq._t = ttq._t || {}
      ttq._t[e] = +new Date()
      ttq._o = ttq._o || {}
      ttq._o[e] = n || {}
      const o = document.createElement('script')
      o.type = 'text/javascript'
      o.async = !0
      o.src = i + '?sdkid=' + e + '&lib=' + this.libName
      const a = document.getElementsByTagName('script')[0]
      a?.parentNode?.insertBefore(o, a)
    }
    this.ttq.load(this.pixelId)
    this.page()

    const global = window as any
    global.TiktokAnalyticsObject = this.libName
    global.ttq = this.ttq
  }

  public static instance: Ttq
  public static init(pixelId: string) {
    if (!this.instance) {
      this.instance = new Ttq(pixelId)
    }
    return this.instance
  }

  public async page() {
    this.ttq.page()
    await delay(0)
  }

  public async track(event: string, data?: any) {
    this.ttq.track(event, {
      ...data,
    })
    await delay(0)
  }
}

export default Ttq

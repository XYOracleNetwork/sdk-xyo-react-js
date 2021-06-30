import { WithDataLayer } from './DataLayer'

class Gtm {
  public containerId?: string

  private constructor(containerId: string) {
    this.containerId = containerId
    const global = window as WithDataLayer
    global.dataLayer = global.dataLayer || []
    global.dataLayer.push({ event: 'gtm.js', 'gtm.start': new Date().getTime() })
  }

  public static getInitialQuery() {
    return sessionStorage.getItem('initialQuery') || ''
  }

  public static clearDataLayer() {
    const global = window as WithDataLayer
    const dataLayer = global.dataLayer as []
    dataLayer.length = 0
  }

  public static instance: Gtm
  public static init(containerId: string) {
    if (!this.instance) {
      this.instance = new Gtm(containerId)
    }
    return this.instance
  }

  public send(event: string, data: Record<string, unknown>, eventTimeout = 500) {
    return new Promise<void>((resolve) => {
      const global = window as WithDataLayer
      global.dataLayer?.push({
        event,
        ...data,
        eventCallback: () => {
          resolve()
        },
        eventTimeout,
      })
    })
  }
}

export default Gtm

import { assertEx } from '@xylabs/sdk-js'
import { parse, stringify } from 'query-string'

import global from '../../global'

class Gtag {
  public updatePagePath(page_path: string) {
    const ga4id = assertEx(this.ga4id, 'Missing GA4ID')
    const pathOnly = page_path.split('?')[0]
    const search = Gtag.getInitialQuery()
    this.gtag('config', ga4id, { page_path: `${pathOnly}${search}` })
  }

  public ga4id?: string
  public awid?: string
  public domains?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public gtag?: any

  private constructor(ga4id: string, awid: string, domains?: string[]) {
    this.ga4id = ga4id
    this.awid = awid
    this.domains = domains
    global.dataLayer = global.dataLayer || []
    this.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      global.dataLayer.push(arguments)
    }
    global.gtag = this.gtag
    this.gtag('js', new Date())
    this.gtag('config', ga4id)
    //this.gtag('config', awid) - this is configured in the Data Stream in Google Analytics
    const parsedQueryString = parse(document.location.search)
    //we handle the utm_referrer here incase a referrer was forwarded (special.coinapp.co does this)
    sessionStorage.setItem(
      'initialReferrer',
      decodeURIComponent(parsedQueryString['utm_referrer']?.toString() ?? document.referrer)
    )
    delete parsedQueryString['utm_referrer']
    const remainingSearch = parsedQueryString ? stringify(parsedQueryString) : ''
    sessionStorage.setItem('initialQuery', remainingSearch)
    sessionStorage.setItem('initialPage', document.location.href)
  }

  //

  public static getInitialQuery() {
    return sessionStorage.getItem('initialQuery') || ''
  }

  public static getInitialPage() {
    return sessionStorage.getItem('initialPage') || ''
  }

  public static getInitialReferrer() {
    return sessionStorage.getItem('initialReferrer') || ''
  }

  public static clearDataLayer() {
    const dataLayer = global.dataLayer as []
    dataLayer.length = 0
  }

  public static instance: Gtag
  public static init(ga4id: string, awid: string, domains?: string[]) {
    if (!this.instance) {
      return this.reinit(ga4id, awid, domains)
    }
    return this.instance
  }

  public static reinit(ga4id: string, awid: string, domains?: string[]) {
    this.instance = new Gtag(ga4id, awid, domains)
    return this.instance
  }

  public static updatePagePath(page_path: string) {
    const instance = assertEx(this.instance, 'Not initialized')
    return instance.updatePagePath(page_path)
  }

  public sendAnalytics(event: string, data: Record<string, unknown>) {
    return new Promise<void>((resolve) => {
      this.gtag('event', event, {
        ...data,
        event_callback: () => {
          resolve()
        },
        event_timeout: 2000,
        page_location: Gtag.getInitialPage(),
        page_referrer: Gtag.getInitialReferrer(),
        send_to: this.ga4id,
      })
    })
  }

  public sendAdwords(event: string, data: Record<string, unknown>) {
    return new Promise<void>((resolve) => {
      this.gtag('event', 'conversion', {
        ...data,
        event_callback: () => {
          resolve()
        },
        event_timeout: 2000,
        send_to: `${this.awid}/${event}`,
      })
    })
  }
}

export default Gtag

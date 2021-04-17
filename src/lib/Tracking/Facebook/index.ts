import FacebookCustomEvent from './CustomEvent'
import Fbq from './Fbq'
export * from './StandardEvents'

export interface FacebookUserClick {
  elementName: string
  elementType: string
}

export { FacebookCustomEvent, Fbq }

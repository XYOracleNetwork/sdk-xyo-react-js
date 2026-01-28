import type {
  PurchaseFields, UserClickFields, ViewContentFields,
} from '@xylabs/pixel'
import { XyCustomEvent } from '@xylabs/react-pixel'
import type { EmptyObject } from '@xylabs/sdk-js'

export class XyEvents<T extends EmptyObject> {
  custom(name: string) {
    return new XyCustomEvent<PurchaseFields | T>(name)
  }

  pageview() {
    return new XyCustomEvent<ViewContentFields | T>('ViewContent')
  }

  purchase() {
    return new XyCustomEvent<PurchaseFields | T>('Purchase')
  }

  userClick() {
    return new XyCustomEvent<UserClickFields | T>('UserClick')
  }

  viewContent() {
    return new XyCustomEvent<ViewContentFields | T>('ViewContent')
  }
}

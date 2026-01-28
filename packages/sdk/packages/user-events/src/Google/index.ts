import type {
  PurchaseFields, UserClickFields, ViewContentFields,
} from '@xylabs/pixel'
import { GoogleCustomEvent, GoogleStandardEvents } from '@xylabs/react-pixel'
import type { EmptyObject } from '@xylabs/sdk-js'

export interface GoogleViewContent extends Record<string, unknown> {
  name: string
  path: string
}

export interface GoogleUserClick extends Record<string, unknown> {
  elementName: string
  elementType: string
}

export class GoogleEvents<TData extends EmptyObject = EmptyObject> extends GoogleStandardEvents<TData> {
  custom<T extends TData>(name: string) {
    return new GoogleCustomEvent<PurchaseFields | T>(name)
  }

  pageView<T extends TData>() {
    return new GoogleCustomEvent<ViewContentFields | T>('PageView')
  }

  userClick<T extends TData>() {
    return new GoogleCustomEvent<UserClickFields | T>('UserClick')
  }

  viewContent<T extends TData>() {
    return new GoogleCustomEvent<ViewContentFields | T>('ViewContent')
  }
}

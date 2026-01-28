import { FacebookCustomEvent, FacebookStandardEvents } from '@xylabs/react-pixel'
import type { EmptyObject } from '@xylabs/sdk-js'

export interface FacebookUserClick extends Record<string, unknown> {
  elementName: string
  elementType: string
}

export class FacebookEvents<T extends EmptyObject> extends FacebookStandardEvents<T> {
  custom<T extends EmptyObject>(name: string) {
    return new FacebookCustomEvent<T>(name)
  }

  userClick() {
    return new FacebookCustomEvent<FacebookUserClick | T>('UserClick')
  }
}

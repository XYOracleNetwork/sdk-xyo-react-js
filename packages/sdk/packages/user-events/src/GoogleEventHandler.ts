import type { EmptyObject } from '@xylabs/object'
import type { GoogleCartProperties, GooglePurchaseProperties } from '@xylabs/react-pixel'

import type { CustomProperties } from './CustomProperties.ts'
import { GoogleEvents } from './Google/index.ts'
import type { XnsPurchaseSuccessFields } from './XnsPurchaseEventHandlerInterface.ts'
import type { Events } from './XyoEventHandler.ts'
import { XyoEventHandler } from './XyoEventHandler.ts'
import type { XyoEventHandlerInterface } from './XyoEventHandlerInterface.ts'

export class GoogleEventHandler<T extends EmptyObject> extends XyoEventHandler<T> implements XyoEventHandlerInterface<T> {
  protected googleEvents = new GoogleEvents<CustomProperties | GoogleCartProperties>()

  override get events() {
    return this.googleEvents as Events<T>
  }

  override async xnsPurchaseSuccess(fields: XnsPurchaseSuccessFields) {
    const googleFields: GooglePurchaseProperties = {
      item_name: fields.name,
      id: fields.id,
      quantity: fields.quantity ?? 1,
      currency: fields.currency ?? 'USD',
      value: fields.value,
    }
    await this.googleEvents.purchase().send(googleFields)
  }
}
